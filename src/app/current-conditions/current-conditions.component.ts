import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ConditionsAndZip} from './conditions-and-zip.type';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentConditionsComponent {

  @Input({required: true}) location: ConditionsAndZip;

  @Output() navigateToForecast: EventEmitter<string> = new EventEmitter<string>();

  showForecast(zip: string) {
    this.navigateToForecast.emit(zip);
  }
}
