import { NgModule } from "@angular/core";
import { ActivityAddComponent } from "./activity-add/activity-add.component";
import { ActivityRouter } from "./activity.router";
import { ActivityComponent } from './activity/activity.component';
import { EventComponent } from './event/event.component';
import { CourseComponent } from './course/course.component';
import { BaseModule } from "src/app/base/base.module";
import { ComponentModule } from "src/app/components/component.module";


@NgModule({
    declarations: [
        ActivityAddComponent,
        ActivityComponent,
        EventComponent,
        CourseComponent
    ],
    imports: [
        ComponentModule,
        ActivityRouter,
        BaseModule
    ]

})

export class ActivityModule { }