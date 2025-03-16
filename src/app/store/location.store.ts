import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {computed, effect, inject} from '@angular/core';
import {LocationStorageService} from '../services/location-storage.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {tapResponse} from '@ngrx/operators';
import {WeatherService} from '../services/weather.service';
import {pipe} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
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
    withComputed((state) => ({
        zipCodes: computed(() => state.locations().map(location => location.zip))
    })),
    withMethods((store, weatherService = inject(WeatherService)) => ({
        addLocation: rxMethod<string> (
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
        ),
        removeLocation(zipcode: string) {
            patchState(store, (state) => ({
                locations: state.locations.filter((location) => location.zip !== zipcode)
            }));
        },
        updateCurrentConditionsForLocation: rxMethod<string> (
            pipe(
                mergeMap((zipcode) => {
                    return weatherService.addCurrentConditions(zipcode).pipe(
                        tapResponse({
                            next: (currentConditions: CurrentConditions) => {
                                const locationIndex = store.locations().findIndex(location => location.zip === zipcode);

                                patchState(store, (state) => ({
                                    locations: [...state.locations.slice(0, locationIndex),
                                        { zip: zipcode, data: currentConditions },
                                        ...state.locations.slice(locationIndex + 1)]
                                }));
                            },
                            error: (error) => console.error(error)
                        })
                    );
                })
            )
        )
    })),
    withMethods((store, locationStorageService = inject(LocationStorageService)) => ({
        // private methods
        _loadLocationsFromStorage() {
            const locations = locationStorageService.getLocationsFromStorage();
            patchState(store, { locations });
        },
        _fetchCurrentConditionsForLocations() {
            for (const zipcode of store.zipCodes()) {
                store.updateCurrentConditionsForLocation(zipcode);
            }
        }
    })),
    withMethods((store) => ({
        loadAllLocations() {
            store._loadLocationsFromStorage();
            store._fetchCurrentConditionsForLocations();
        },
    })),
    withHooks({
        onInit(store, locationStorageService = inject(LocationStorageService)) {
            effect(() => locationStorageService.saveLocationsToStorage(store.locations()));

            store.loadAllLocations();
        }
    })
);
