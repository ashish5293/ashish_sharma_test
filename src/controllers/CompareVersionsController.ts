import { Request, Next, Response } from "restify";
import { Controller, Post } from "inversify-restify-utils";
import { injectable } from "inversify";
import {
    compareVersionsWithCheckingCache,
    isValidVersion,
    VersionValidationError
} from '../questionB/compareVersions';

@injectable()
@Controller("/")
export class CompareVersionsController {

    private static validateRequestBody(req: Request): boolean {
        if(!req.body) {
            return false
        }
        if (! ("version1" in req.body) ||  ! ("version2" in req.body)) {
            return false
        }
        const { version1, version2 } = req.body;

        return (
            typeof version1 === "string" &&
            typeof version2 === "string" &&
            isValidVersion(version1) &&
            isValidVersion(version2)
        );
    }

    @Post("/compare-versions")
    public async postCompare(req: Request, res: Response, next: Next): Promise<void> {
        if (!CompareVersionsController.validateRequestBody(req)) {
            res.send(400, {
                message: 'Bad request: Invalid line segment data. ' +
                    'The request body should be of type ' +
                    '{' +
                    '   version1: string, ' +
                    '   version2: string' +
                    '} '
            });
            return next();
        }

        try {
            const { version1, version2 } = req.body as any;
            const result = await compareVersionsWithCheckingCache(version1, version2);
            const response = {
                message: ""
            }
            if (result === 1) {
                response.message = `${version1} is greater than ${version2}.`
            }
            if (result === -1) {
                response.message = `${version1} is less than ${version2}.`
            }
            if (result === 0) {
                response.message = `${version1} and ${version2} are both equal to each other.`
            }
            res.send(response);
        } catch (error) {
            if (error instanceof VersionValidationError) {
                res.send(400, { error: error.message });
            } else {
                res.send(500, { error: 'An unexpected error occurred.' });
            }
        }

        return next();
    }
}
