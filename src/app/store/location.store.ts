import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {inject} from '@angular/core';
import {LocationStorageService} from '../services/location-storage.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {WeatherService} from '../services/weather.service';
import {pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';

export interface LocationState {
    locations: ConditionsAndZip[];
}

export const initialState: LocationState = {
    locations: []
};

export const LocationStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store,
                 locationStorageService = inject(LocationStorageService),
                 weatherService = inject(WeatherService)) => ({
        loadAllLocations() {
            const locations = locationStorageService.getLocationsFromStorage();
            patchState(store, { locations });
        },
        addLocation: rxMethod<void>(
            pipe(
                switchMap(() => {
                    return weatherService.getItems().pipe(
                        tapResponse({
                            next: (items) => patchState(store, { items }),
                            error: console.error,
                            finalize: () => patchState(store, { loading: false }),
                        })
                    );
                })
            )
        )
    }))
);
