import {Component, inject, Signal} from '@angular/core';
import {Forecast} from './forecast.type';
import {ForecastStore} from '../store/forecast.store';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  protected readonly forecastStore = inject(ForecastStore);

  protected forecast: Signal<Forecast> = this.forecastStore.forecast
}

