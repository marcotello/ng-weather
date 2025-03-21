import {Component, inject} from '@angular/core';
import {CurrentConditionsStore} from '../store/current-conditions.store';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  private readonly CurrentConditionsStore = inject(CurrentConditionsStore);

  addLocation(zipcode: string) {
    this.CurrentConditionsStore.addLocation(zipcode);
  }

}
