import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { RegisterComponent } from "./register.component";
import { RegisterRouter } from "./register.router";


@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,        
        CheckboxModule,
        PasswordModule,
        RegisterRouter
    ]

})

export class RegisterModule { }