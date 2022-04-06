import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>      
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin/dashboard'] }
                ]
            },
            {
                label: 'Master',
                items: [
                    { label: 'Category', icon: 'pi pi-fw pi-table', routerLink: ['/admin/category/list'] },
                    { label: 'Industry', icon: 'pi pi-fw pi-table', routerLink: ['/admin/industry/list'] },
                    { label: 'Position', icon: 'pi pi-fw pi-table', routerLink: ['/admin/position/list'] },
                    { label: 'Role', icon: 'pi pi-fw pi-table', routerLink: ['/admin/role/list'] },
                    { label: 'Transaction Status', icon: 'pi pi-fw pi-table', routerLink: ['/admin/transaction-status/list'] },
                    { label: 'User', icon: 'pi pi-fw pi-table', routerLink: ['/admin/user/list'] }
                ]
            },
            {
                label: 'Transaction',
                items: [
                    { label: 'Crud', icon: 'pi pi-fw pi-table', routerLink: ['/pages/crud'] },
                ]
            },
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
