// These are mock region codes for demonstration purposes.
// On the basis of these region codes the request would be forwarded to correct Cache.
// In a production environment we can expect these region codes to be provided in the request
export const GEOGRAPHICAL_REGION_CODES = [
    'us-east-1', // US East (N. Virginia)
    'us-west-1', // US West (N. California)
    'eu-west-1', // EU (Ireland)
] as const;

export type RegionCode = typeof GEOGRAPHICAL_REGION_CODES[number];

export function getRandomGeographicalRegionCode(): RegionCode {
    const randomIndex = Math.floor(Math.random() * GEOGRAPHICAL_REGION_CODES.length);
    return GEOGRAPHICAL_REGION_CODES[randomIndex];
}