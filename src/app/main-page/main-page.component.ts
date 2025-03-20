import {Component, inject, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../services/weather.service';
import {LocationStore} from '../store/location.store';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {
  private readonly router = inject(Router);
  protected readonly weatherService = inject(WeatherService);
  protected readonly locationStore = inject(LocationStore);

  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.locationStore.locations;

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }

  removeLocation(zipcode: string) {
    this.locationStore.removeLocation(zipcode);
  }
}
