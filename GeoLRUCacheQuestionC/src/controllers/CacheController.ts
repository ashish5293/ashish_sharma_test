import { Request, Next, Response } from "restify";
import { Controller, Post } from "inversify-restify-utils";
import { injectable, inject, named } from "inversify";
import { BadRequestError } from 'restify-errors';
import { LRUCache } from "../LRUCache";
import { TYPES } from "../types";
import {REGIONAL_CACHE_ENDPOINTS, RegionCode} from "../GeographicalRegionCodes";
import axios from "axios";

@injectable()
@Controller("/")
export class CacheController {
    constructor(
        @inject(TYPES.LRUCache)
        @named(TYPES.LRUCache)
        private readonly cache: LRUCache<any>
    ) {
        this.cache = cache;
    }

    @Post("/get")
    public async get(req: Request, res: Response, next: Next): Promise<void> {
        if (! ("key" in req.body) ) {
            return next(new BadRequestError('Key is required.'));
        }

        const key = req.body["key"] as string;
        const value = this.cache.get(key);
        res.send({ result: value })
    }

    @Post("/set")
    public async set(req: Request, res: Response, next: Next): Promise<void> {
        if (! ("key" in req.body) || ! ("value" in req.body) ) {
            return next(new BadRequestError('Key and value are required.'));
        }

        const key = req.body["key"] as string
        const value = req.body["value"]

        let expiration = 100000
        if ("expiration" in req.body) {
            expiration = req.body["expiration"] as number
        }

        this.cache.set(key, value, expiration);
        res.send(200);
        if (!("requestFromAnotherCacheServer" in req.body) || !req.body["requestFromAnotherCacheServer"] ) {
            this.syncOtherCacheServers(key, value, expiration).then(r => console.log("Syncing process complete"));
        }
    }

    private async syncOtherCacheServers(key: string, value: any, expiration: number): Promise<void> {
        for(let server in REGIONAL_CACHE_ENDPOINTS) {
            if (server !== process.env.REGION) {
                // update other regions
                try {
                    const cacheServiceUrl = REGIONAL_CACHE_ENDPOINTS[server as RegionCode];
                    const endpoint = `${cacheServiceUrl}/set`;

                    // Send a request to the cache service
                    const response = await axios.post(endpoint, {
                        key,
                        value,
                        expiration,
                        requestFromAnotherCacheServer: true
                    });
                    if (response.status !== 200) {
                        console.error(`Cache service in region ${server} responded with status: ${response.status}`);
                    } else {
                        console.log(`Cache successfully set for key in region ${server} -> ${key}`)
                    }
                } catch (error) {
                    console.error(`Error during cache update for region ${server}: ${error}`);
                }
            }
        }
    }
}