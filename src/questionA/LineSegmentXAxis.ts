import {get, set} from "../cacheManager/CacheManager";
import {RegionCode} from "../GeographicalRegionCodes";
import {compareVersions} from "../questionB/compareVersions";

export class LineSegmentXAxis {

    constructor(public x1: number, public x2: number) {}

    public overlapsWith(lineSegment: LineSegmentXAxis): boolean {
        // If one line segment starts after the other line segment ends, then they overlap
        return !(this.x1 > lineSegment.x2 || lineSegment.x1 > this.x2);
    }

    public async cacheCheckOverlapsWith(lineSegment: LineSegmentXAxis, regionCode: RegionCode = "us-east-1") {
        // Compute a unique cache key using parameters
        const cacheKey = `overlapsWith-${this.x1}-${this.x2}-${lineSegment.x1}-${lineSegment.x2}`;

        // Use the cache utility to fetch the cache
        let cacheResult = await get(cacheKey, regionCode);

        if(typeof cacheResult !== "boolean") {
            cacheResult =  this.overlapsWith(lineSegment)
            // if cache miss, then set the cache
            set(cacheKey, cacheResult, 50000, regionCode)
        }

        return cacheResult
    }
}
