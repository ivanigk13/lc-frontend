import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { Menubar, MenubarModule } from "primeng/menubar";
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { ActivityAddComponent } from "./activity-add/activity-add.component";
import { ActivityRouter } from "./activity.router";


@NgModule({
    declarations: [
        ActivityAddComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ActivityRouter,
        MenubarModule,
        CheckboxModule,
        PasswordModule
    ]

})

export class ActivityModule { }