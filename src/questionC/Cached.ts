import { LRUCache } from './LRUCache';

// Decorator factory that returns a method decorator
export function Cached<K, V>(cache: LRUCache<V>, expiration?: number) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const cacheKey = `${propertyName}(${JSON.stringify(args)})`;
            let cachedResult = cache.get(cacheKey);

            if (cachedResult !== null) {
                console.log(`Cache hit for key: ${cacheKey}`);
                return cachedResult;
            } else {
                console.log(`Cache miss for key: ${cacheKey}. Fetching and updating cache.`);
                const result = originalMethod.apply(this, args);
                if (result instanceof Promise) {
                    // Ensure we cache the resolved data when used with asynchronous functions
                    return result.then(data => {
                        cache.set(cacheKey, data, expiration);
                        return data;
                    });
                } else {
                    cache.set(cacheKey, result, expiration);
                    return result;
                }
            }
        };
    };
}

