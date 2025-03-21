import {Component, inject, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {CurrentConditionsStore} from '../store/current-conditions.store';
import {ConditionsAndZip} from '../current-conditions/conditions-and-zip.type';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {
  private readonly router = inject(Router);
  protected readonly currentConditionsStore = inject(CurrentConditionsStore);

  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.currentConditionsStore.locations;

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }

  removeLocation(zipcode: string) {
    this.currentConditionsStore.removeLocation(zipcode);
  }
}
