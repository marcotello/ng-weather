import {CacheOptions} from './types/cache-options.type';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CacheStorage} from './types/storage.type';

export function DataCache<T extends CacheStorage>(options: Partial<CacheOptions>) {

    return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {

            const cacheKey = options.key || `${target.constructor.name}.${propertyKey}`;
            const key = options?.withArgs ? `${cacheKey}_${JSON.stringify(args)}` : cacheKey;

            const cachedData: any = this.localStorageCacheService.getCache(key);

            if (cachedData) {
                return of(cachedData);
            } else {
                return originalMethod.apply(this, args).pipe(
                    tap((response) => {
                        this.localStorageCacheService.setCache(key, response, options.expirationTimeInSeconds);
                    })
                );
            }
        };

        return descriptor;
    }
}
