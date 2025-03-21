import {CacheOptions} from './types/cache-options.type';
import {Storage} from './types/storage.type';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs';

export function DataCache<T extends Storage>(options: Partial<CacheOptions>) {

    return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {

            const cacheKey = options.key || `${target.constructor.name}.${propertyKey}`;
            const key = options?.withArgs ? `${cacheKey}_${JSON.stringify(args)}` : cacheKey;

            const cachedData: any = this.storageService.getItem(key);

            if (cachedData) {
                return of(cachedData);
            } else {
                return originalMethod.apply(this, args).pipe(
                    tap((response) => {
                        console.log(`Saving data to storage: ${cacheKey}`);
                        this.storageService.setItem(key, response, options.expirationTimeInSeconds);
                    })
                );
            }
        };

        return descriptor;
    }
}
