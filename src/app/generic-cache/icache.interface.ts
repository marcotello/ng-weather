import {ExpirationTime} from './types/expiration-time.type';

// I created this interface to give the ability to the users to inject the implementation in the providers using useClass.
// This will allow to easily switch the implementation for different caching strategies (IndexDB, Firebase, etc)
export interface ICache {
    setCache<T>(key: string, value: T, expirationTimeInSeconds: ExpirationTime): void;

    getCache<T>(key: string): T | null;

    removeCache(key: string): void;

    clearCache(): void;
}
