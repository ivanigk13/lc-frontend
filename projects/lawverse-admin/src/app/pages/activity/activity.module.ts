import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { Menubar, MenubarModule } from "primeng/menubar";
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { ComponentModule } from "src/app/components/component.module";
import { ActivityAddComponent } from "./activity-add/activity-add.component";
import { ActivityRouter } from "./activity.router";
import { ActivityComponent } from './activity/activity.component';


@NgModule({
    declarations: [
        ActivityAddComponent,
        ActivityComponent
    ],
    imports: [
        ComponentModule,
        FormsModule,
        CommonModule,
        InputTextareaModule,
        CalendarModule,
        FileUploadModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ActivityRouter,
        DropdownModule,
        MenubarModule,
        CheckboxModule,
        PasswordModule
    ]

})

export class ActivityModule { }