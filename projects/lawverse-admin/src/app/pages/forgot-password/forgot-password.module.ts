import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { ForgotPasswordRouter } from "./forgot-password.router";


@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ForgotPasswordRouter,
        CheckboxModule,
        PasswordModule
    ]

})

export class ForgotPasswordModule { }