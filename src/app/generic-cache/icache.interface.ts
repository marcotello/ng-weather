import {ExpirationTime} from './types/expiration-time.type';

export interface ICache {
    setCache<T>(key: string, value: T, expirationTimeInSeconds: ExpirationTime): void;

    getCache<T>(key: string): T | null;

    removeCache(key: string): void;

    clearCache(): void;
}
