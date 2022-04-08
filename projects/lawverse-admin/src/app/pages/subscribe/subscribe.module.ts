import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { ComponentModule } from "src/app/components/component.module";
import { ActivityRouter } from "../activity/activity.router";
import { SubscribeComponent } from "./subscribe.component";
import { SubscribeRouter } from "./subscribe.router";

@NgModule({
    declarations: [
        SubscribeComponent,
    ],
    imports: [
        ComponentModule,
        SubscribeRouter,
        BaseModule
    ]

})

export class SubscribeModule { }