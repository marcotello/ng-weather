import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {Router} from '@angular/router';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {LocationStore} from '../store/location.store';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  private readonly router = inject(Router);
  protected readonly weatherService = inject(WeatherService);
  protected readonly conditionsAndZipStore = inject(LocationStore);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }
}
