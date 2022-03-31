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
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { ComponentModule } from "src/app/components/component.module";
import { ThreadAddComponent } from './thread-add/thread-add.component';
import { ThreadRouter } from "./thread.router";
import { ThreadComponent } from './thread/thread.component';


@NgModule({
    declarations: [         
    ThreadAddComponent, ThreadComponent
  ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        InputTextareaModule,
        ComponentModule,
        DropdownModule,
        ButtonModule,
        FileUploadModule,
        InputTextModule,
        CheckboxModule,
        ThreadRouter,
        PasswordModule,
    
    ]

})

export class ThreadModule { }