import {Component, inject} from '@angular/core';
import {LocationService} from '../services/location.service';
import {LocationStore} from '../store/location.store';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  private readonly locationStore = inject(LocationStore);

  addLocation(zipcode: string) {
    this.locationStore.addLocation(zipcode);
  }

}
