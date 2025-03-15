import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {effect, inject} from '@angular/core';
import {LocationStorageService} from '../services/location-storage.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {tapResponse} from '@ngrx/operators';
import {WeatherService} from '../services/weather.service';
import {pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CurrentConditions} from '../model/current-conditions.type';

interface LocationState {
    locations: ConditionsAndZip[];
}

const initialState: LocationState = {
    locations: []
};

export const LocationStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store,
                 locationStorageService = inject(LocationStorageService),
                 weatherService = inject(WeatherService)) => ({
        _loadAllLocations() {
            const locations = locationStorageService.getLocationsFromStorage();
            patchState(store, { locations });
        },
        addLocation: rxMethod<string>(
            pipe(
                switchMap((zipcode) => {
                    return weatherService.addCurrentConditions(zipcode).pipe(
                        tapResponse({
                            next: (currentConditions: CurrentConditions) => {
                                patchState(store, (state) => ({
                                    locations: [...state.locations, { zip: zipcode, data: currentConditions }]
                                }));
                            },
                            error: (error) => console.error(error)
                        })
                    );
                })
            )
        )
    })),
    withHooks({
        onInit(store, locationStorageService = inject(LocationStorageService)) {
            effect(() => locationStorageService.saveLocationsToStorage(store.locations()))
            store._loadAllLocations()
        }
    })
);
