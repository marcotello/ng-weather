import {ExpirationTime} from './expiration-time.type';

export interface CacheOptions {
    key: string;
    expirationTimeInSeconds: number;
    withArgs: boolean;
}
