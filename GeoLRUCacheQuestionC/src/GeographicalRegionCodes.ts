// These are mock region codes for demonstration purposes.
// On the basis of these region codes the request would be forwarded to correct Cache.
// In a production environment we can expect these region codes to be provided in the request
export const GEOGRAPHICAL_REGION_CODES = [
    'us-east-1', // US East (N. Virginia)
    'us-west-1', // US West (N. California)
    'eu-west-1', // EU (Ireland)
] as const;

export type RegionCode = typeof GEOGRAPHICAL_REGION_CODES[number];

// Cache service endpoints configuration for each region
export const REGIONAL_CACHE_ENDPOINTS: {[K in RegionCode]?: string} = {
    'us-east-1': 'http://ormuco-cache-us-east-1:8087/',
    'us-west-1': 'http://ormuco-cache-us-west-1:8087/',
    'eu-west-1': 'http://ormuco-cache-eu-west-1:8087/',
};