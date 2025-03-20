import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  @Input({ required: true }) tabId: string;
  @Input({ required: true }) title: string;
  @Input() isActive = false;
}
