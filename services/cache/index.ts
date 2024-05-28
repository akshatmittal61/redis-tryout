import { RedisClientType, createClient } from 'redis';
import log from '../../log';

class Cache {
    private cache: RedisClientType;

    constructor() {
        this.cache = createClient();
        this.cache.connect();
    }

    async getAll() {
        const keys = await this.cache.keys('*');
        const values = await this.cache.mGet(keys);
        return keys.map((key, index) => ({ key, value: values[index] }));
    };

    async get(key: string): Promise<string | null> {
        const value = await this.cache.get(key);
        return value;
    };

    async set(key: string, value: any, ttl: number = 0) {
        if (value === null || value === undefined) return;
        if (ttl > 0) {
            await this.cache.setEx(key, ttl, JSON.stringify(value));
        } else {
            await this.cache.set(key, JSON.stringify(value));
        }
    };

    async delete(key: string) {
        await this.cache.del(key);
    };

    async invalidate(key: string) {
        const exists = await this.cache.exists(key);
        if (exists) {
            await this.cache.del(key);
        }
    };

    async clear() {
        await this.cache.flushAll();
    };

    async fetch<T>(
        key: string,
        callback: () => Promise<T>,
        ttl: number = 0
    ): Promise<T> {
        const cachedValue = await this.get(key);
        if (cachedValue) {
            log.info(`Cache hit: ${key}`);
            return JSON.parse(cachedValue);
        }
        log.info(`Cache miss: ${key}`);
        const newValue = await callback();
        this.set(key, newValue, ttl);
        return newValue;
    }
}

const cache = new Cache();

export default cache;
