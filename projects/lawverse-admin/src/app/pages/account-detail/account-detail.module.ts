import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { AccountDetailRouter } from "./account-detail.router";
import { AccountDetailComponent } from './account-detail.component';
import { DropdownModule } from "primeng/dropdown";



@NgModule({
    declarations: [            
    AccountDetailComponent
  ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        AccountDetailRouter,
        CheckboxModule,
        DropdownModule,
        PasswordModule
    ]

})

export class AccountDetailModule { }