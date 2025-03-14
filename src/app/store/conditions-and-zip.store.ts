import {signalStore, withState} from '@ngrx/signals';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {inject} from '@angular/core';
import {LocationStorageService} from '../services/location-storage.service';

export interface ConditionsAndZipState {
    locations: ConditionsAndZip[];
}

export const initialState: ConditionsAndZipState = {
    locations: inject(LocationStorageService).getLocationsFromStorage()
};

export const ConditionsAndZipStore = signalStore(
    { providedIn: 'root' },
    withState(initialState)
);
