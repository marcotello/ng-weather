import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {inject} from '@angular/core';
import {LocationStorageService} from '../services/location-storage.service';

export interface ConditionsAndZipState {
    locations: ConditionsAndZip[];
}

/*export const initialState: ConditionsAndZipState = {
    locations: inject(LocationStorageService)
};*/

export const initialState: ConditionsAndZipState = {
    locations: []
};

export const ConditionsAndZipStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, locationStorageService = inject(LocationStorageService)) => ({
        loadAllLocations() {
            const locations = locationStorageService.getLocationsFromStorage();
            patchState(store, { locations });
        }
    }))
);
