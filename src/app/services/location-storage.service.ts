import {inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {ConditionsAndZip} from '../current-conditions/conditions-and-zip.type';
// import {neverExpire} from '../generic-cache/types/no-expiration.type';
// import {LocalStorageCacheService} from '../generic-cache/local-storage-cache.service';

export const LOCATIONS = 'locations'

@Injectable({
  providedIn: 'root'
})
export class LocationStorageService {

  protected storageService = inject(StorageService);

  // This is an example of using the LocalStorageCacheService.
  // protected localStorageCacheService = inject(LocalStorageCacheService)

  getLocationsFromStorage(): ConditionsAndZip[] {
    return this.storageService.getItem<ConditionsAndZip[]>(LOCATIONS) || [];

    // In case we want to use the cache for getting this data.
    // return this.localStorageCacheService.getCache(LOCATIONS);
  }

  saveLocationsToStorage(locations: ConditionsAndZip[]): void {
    this.storageService.setItem<ConditionsAndZip[]>(LOCATIONS, locations);

    // In case we want to use the cache for storing this data.
    // this.localStorageCacheService.setCache(LOCATIONS, locations, neverExpire);
  }
}
