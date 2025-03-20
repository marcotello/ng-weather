import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {TabComponent} from '../tab/tab.component';
import {NgForOf, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    NgForOf,
    TitleCasePipe
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter(tab => tab.isActive);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => tab.isActive = false);

    tab.isActive = true;
  }

  closeTab(tabId: string) {
    console.log('Tab closed ' + tabId);
  }
}
