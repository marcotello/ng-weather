import {AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList} from '@angular/core';
import {NgForOf, TitleCasePipe} from '@angular/common';
import {TabComponent} from '../tab/tab.component';

@Component({
    selector: 'app-tabs-container',
    standalone: true,
    imports: [
        NgForOf,
        TitleCasePipe
    ],
    templateUrl: './tabs-container.component.html',
    styleUrl: './tabs-container.component.css'
})
export class TabsContainerComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

    @Output() closeTab: EventEmitter<string> = new EventEmitter<string>();

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

    close(tabId: string) {
        this.closeTab.emit(tabId);
    }
}
