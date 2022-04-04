import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { PositionAddComponent } from "./position-add/position-add.component";
import { PositionListComponent } from "./position-list/position-list.component";
import { PositionRouter } from "./position.router";

@NgModule({
    declarations: [
        PositionAddComponent,
        PositionListComponent
    ],
    imports: [
        BaseModule,
        PositionRouter
    ]

})

export class PositionModule { }