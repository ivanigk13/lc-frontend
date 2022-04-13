import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { BaseModule } from "src/app/base/base.module";
import { RegisterComponent } from "./register.component";
import { RegisterRouter } from "./register.router";


@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        BaseModule,
        RegisterRouter
    ]

})

export class RegisterModule { }