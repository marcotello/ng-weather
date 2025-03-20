import {inject, Injectable} from '@angular/core';
import {StorageService} from '../generic-cache/storage.service';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';

export const LOCATIONS = 'locations'

@Injectable({
  providedIn: 'root'
})
export class LocationStorageService {

  protected storageService = inject(StorageService<ConditionsAndZip>);

  getLocationsFromStorage(): ConditionsAndZip[] {
    return this.storageService.getItem(LOCATIONS) || [];
  }

  saveLocationsToStorage(locations: ConditionsAndZip[]): void {
    this.storageService.setItem(LOCATIONS, locations);
  }
}
