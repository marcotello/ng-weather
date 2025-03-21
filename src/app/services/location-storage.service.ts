import {inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {neverExpire} from '../generic-cache/types/no-expiration.type';

export const LOCATIONS = 'locations'

@Injectable({
  providedIn: 'root'
})
export class LocationStorageService {

  protected storageService = inject(StorageService);

  getLocationsFromStorage(): ConditionsAndZip[] {
    return this.storageService.getItem<ConditionsAndZip[]>(LOCATIONS) || [];
  }

  saveLocationsToStorage(locations: ConditionsAndZip[]): void {
    this.storageService.setItem<ConditionsAndZip[]>(LOCATIONS, locations);
  }
}
