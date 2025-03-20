import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList
} from '@angular/core';
import {NgForOf, TitleCasePipe} from '@angular/common';
import {TabComponent} from '../tab/tab.component';
import {skip, startWith} from 'rxjs/operators';

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

        this.tabs.changes
            .pipe(
                startWith(0)
            )
            .subscribe(change => {
                this.selectTab(this.tabs.last);
            });
    }

    selectTab(tab: TabComponent) {
        this.tabs.toArray().forEach(tab => tab.deactivate());

        tab.activate();
    }

    close(tabId: string) {
        this.closeTab.emit(tabId);
    }
}
