import {inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';

export const LOCATIONS = 'locations'

@Injectable({
  providedIn: 'root'
})
export class LocationStorageService {

  protected storageService = inject(StorageService<ConditionsAndZip>);

  getLocationsFromStorage(): ConditionsAndZip[] {
    return this.storageService.get(LOCATIONS) || [];
  }
}
