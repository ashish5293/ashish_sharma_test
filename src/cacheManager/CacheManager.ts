import { RegionCode } from "../GeographicalRegionCodes"
import axios from "axios";

// Cache service endpoints configuration for each region
const REGIONAL_CACHE_ENDPOINTS: {[K in RegionCode]?: string} = {
    'us-east-1': 'http://ormuco-cache-us-east-1:8087/',
    'us-west-1': 'http://ormuco-cache-us-west-1:8087/',
    'eu-west-1': 'http://ormuco-cache-eu-west-1:8087/',
};


export async function get(
    key: string,
    regionCode: RegionCode = "us-east-1"
): Promise<any> {
    const cacheServiceUrl = REGIONAL_CACHE_ENDPOINTS[regionCode];
    const endpoint = `${cacheServiceUrl}/get`;

    try {
        // Send a request to the cache service
        const response = await axios.post(endpoint, {key});

        if (response.status !== 200) {
            console.error(`Cache service responded with status: ${response.status}`);
        }

        if ("result" in response.data && response.data.result !== undefined) {
            console.log(`Cache hit for key -> ${key}`)
        }
        return response.data.result;
    } catch (error) {
        console.error(`Error during cache retrieval: ${error}`);
        return null
    }
}

export async function set(
    key: string,
    value: any,
    expiration: number,
    regionCode: RegionCode = "us-east-1"
): Promise<void> {
    const cacheServiceUrl = REGIONAL_CACHE_ENDPOINTS[regionCode];
    const endpoint = `${cacheServiceUrl}/set`;

    try {
        // Send a request to the cache service
        const response = await axios.post(endpoint, {
            key,
            value,
            expiration
        });
        if (response.status !== 200) {
            console.error(`Cache service responded with status: ${response.status}`);
        } else {
            console.log(`Cache successfully set for key in ${regionCode} -> ${key}`)
        }

    } catch (error) {
        console.error(`Error during cache update: ${error}`);
    }
}