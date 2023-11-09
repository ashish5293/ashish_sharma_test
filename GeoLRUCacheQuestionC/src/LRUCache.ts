import {injectable} from "inversify";

type CacheValue<T> = {
    value: T;
    expiresAt: number;
};
@injectable()
export class LRUCache<V> {
    private cacheMap: Map<string, CacheValue<V>>;
    private readonly maxSize: number;
    private readonly defaultExpiration: number;

    constructor(maxSize: number, defaultExpiration: number = 10000) {
        this.cacheMap = new Map<string, CacheValue<V>>();
        this.maxSize = maxSize;
        this.defaultExpiration = defaultExpiration;
    }

    public get(key: string): V | null {
        const item = this.cacheMap.get(key);
        if (!item) {
            return null;
        }
        if (item.expiresAt < Date.now()) {
            // if item is already in the cache but has expired, then it needs to be removed
            this.cacheMap.delete(key);
            return null;
        }
        // if item exists and is not expired, then refresh it as the most recently used
        this.set(key, item.value);
        return item.value;
    }

    public set(key: string, value: V, expiration?: number): void {
        if (this.cacheMap.has(key)) {
            // to refresh the position of the key
            this.cacheMap.delete(key);
        } else if (this.cacheMap.size >= this.maxSize) {
            // Remove the least recently used item
            const lruKey = this.cacheMap.keys().next().value;
            this.cacheMap.delete(lruKey);
        }
        const expiresAt = Date.now() + (expiration || this.defaultExpiration);
        this.cacheMap.set(key, { value, expiresAt });
    }

    public delete(key: string): void {
        this.cacheMap.delete(key);
    }

    public has(key: string): boolean {
        return this.cacheMap.has(key);
    }

    public clear(): void {
        this.cacheMap.clear();
    }
}
