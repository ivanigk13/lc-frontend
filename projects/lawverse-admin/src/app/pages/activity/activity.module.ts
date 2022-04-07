import { NgModule } from "@angular/core";
import { ActivityRouter } from "./activity.router";
import { ActivityComponent } from './activity/activity.component';
import { BaseModule } from "src/app/base/base.module";
import { ComponentModule } from "src/app/components/component.module";


@NgModule({
    declarations: [
        ActivityComponent,
    ],
    imports: [
        ComponentModule,
        ActivityRouter,
        BaseModule
    ]

})

export class ActivityModule { }