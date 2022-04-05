import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { LoginComponent } from "./login.component";
import { LoginRouter } from "./login.router";


@NgModule({
    declarations: [
       LoginComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        LoginRouter,
        CheckboxModule,
        PasswordModule
    ]

})

export class LoginModule { }