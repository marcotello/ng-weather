import {ExpirationTime} from './expiration-time.type';

export type NeverExpire = Exclude<ExpirationTime, number>;

export const neverExpire: NeverExpire = 'never';
