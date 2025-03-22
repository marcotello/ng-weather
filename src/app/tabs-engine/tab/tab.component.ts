import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  // Using a signal to control when the tab is active and it can display content
  private isActive = signal<boolean>(false);
  isActiveSignal = this.isActive.asReadonly();

  @Input({ required: true }) tabId: string;
  @Input({ required: true }) title: string;

  activate(): void {
    this.isActive.set(true);
  }

  deactivate(): void {
    this.isActive.set(false);
  }
}
