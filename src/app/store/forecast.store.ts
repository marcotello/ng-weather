import {Forecast} from '../forecasts-list/forecast.type';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {tapResponse} from '@ngrx/operators';

interface ForecastState {
    forecast: Forecast;
}

const initialState: ForecastState = {
    forecast: null
};

export const ForecastStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, weatherService = inject(WeatherService)) => ({
        getForecast: rxMethod<string> (
            pipe(
                switchMap((zipcode) => {
                    return weatherService.getForecast(zipcode).pipe(
                        tapResponse({
                            next: (forecast: Forecast) => {
                                patchState(store, (state) => ({
                                    forecast: forecast
                                }));
                            },
                            error: (error) => console.error(error)
                        })
                    );
                })
            )
        )
    }))
);
