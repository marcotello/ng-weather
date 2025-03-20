import {ExpirationTime} from './expiration-time.type';

export interface CachedItem<T> {
    value: T;
    expirationTimeInSeconds: ExpirationTime;
    timestamp: number;
}
