import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { IndustryAddComponent } from "./industry-add/industry-add.component";
import { IndustryListComponent } from "./industry-list/industry-list.component";
import { IndustryRouter } from "./industry.router";
import { IndustryUpdateComponent } from './industry-update/industry-update.component';

@NgModule({
    declarations: [
        IndustryListComponent,
        IndustryAddComponent,
        IndustryUpdateComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        IndustryRouter
    ]

})

export class IndustryModule { }