import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { TransactionStatusListComponent } from "./transaction-status-list/transaction-status-list.component";
import { TransactionStatusRouter } from "./transaction-status.router";

@NgModule({
    declarations: [
        TransactionStatusListComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        TransactionStatusRouter
    ]

})

export class TransactionStatusModule { }