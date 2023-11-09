import { Request, Next, Response } from "restify";
import { Controller, Post } from "inversify-restify-utils";
import { injectable } from "inversify";
import {LineSegmentXAxis} from "../questionA/LineSegmentXAxis"
import {getRandomGeographicalRegionCode} from "../GeographicalRegionCodes";

@injectable()
@Controller("/")
export class OverlappingLinesXAxisController {

    private static validateRequestBody(req: Request): boolean {

        if(!req.body) {
            return false
        }
        if (! ("lineSegment1" in req.body) ||  ! ("lineSegment2" in req.body)) {
            return false
        }
        const { lineSegment1, lineSegment2 } = req.body;

        const isSegmentValid = (segment: any): boolean =>
            segment && typeof segment.x1 === 'number' && typeof segment.x2 === 'number';

        return (
            isSegmentValid(lineSegment1) &&
            isSegmentValid(lineSegment2)
        );
    }


    @Post("/check-overlap")
    public async checkOverlap(req: Request, res: Response, next: Next): Promise<void> {

        // Generate a random region code for the current request
        // in production environment this information will be provided by the user agent
        const regionCode = getRandomGeographicalRegionCode();

        if(!OverlappingLinesXAxisController.validateRequestBody(req)) {
            res.send(400, {
                message: 'Bad request: Invalid line segment data. ' +
                    'The request body should be of type ' +
                    '{' +
                    '   lineSegment1: {x1: number, x2: number}, ' +
                    '   lineSegment2: {x1: number, x2: number} ' +
                    '} '
            });
            return next();
        }

        const { lineSegment1, lineSegment2 } = req.body as any;

        try {
            const segment1 = new LineSegmentXAxis(lineSegment1.x1, lineSegment1.x2);
            const segment2 = new LineSegmentXAxis(lineSegment2.x1, lineSegment2.x2);
            const overlap = await segment1.cacheCheckOverlapsWith(segment2, regionCode);
            res.send({ overlap });
        } catch (error: any) {
            res.send(500, { message: 'Internal Server Error', error: error.message });
        }

        return next();
    }

}