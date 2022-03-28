import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { PositionAddComponent } from "./position-add/position-add.component";
import { PositionListComponent } from "./position-list/position-list.component";
import { PositionRouter } from "./position.router";

@NgModule({
    declarations: [
        PositionAddComponent,
        PositionListComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        PositionRouter
    ]

})

export class PositionModule { }