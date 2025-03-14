import {signalStore, withState} from '@ngrx/signals';
import {ConditionsAndZip} from '../model/conditions-and-zip.type';
import {inject} from '@angular/core';
import {LocationService} from '../location.service';

export interface ConditionsAndZipState {
    items: ConditionsAndZip[];
    loading: boolean;
}

export const initialState: ConditionsAndZipState = inject(LocationService).

export const ConditionsAndZipStore = signalStore(
    { providedIn: 'root' },
    withState(initialState)
);
