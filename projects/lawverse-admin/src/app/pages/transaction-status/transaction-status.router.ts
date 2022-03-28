import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransactionStatusListComponent } from "./transaction-status-list/transaction-status-list.component";

const routes: Routes = [
    {
        path: 'list',
        component: TransactionStatusListComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class TransactionStatusRouter { }