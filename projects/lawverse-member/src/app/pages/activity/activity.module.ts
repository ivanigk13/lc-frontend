import { NgModule } from "@angular/core";
import { ActivityAddComponent } from "./activity-add/activity-add.component";
import { ActivityRouter } from "./activity.router";
import { ActivityComponent } from './activity/activity.component';
import { EventComponent } from './event/event.component';
import { CourseComponent } from './course/course.component';
import { BaseModule } from "src/app/base/base.module";
import { ComponentModule } from "src/app/components/component.module";
import { ActivityUpdateComponent } from './activity-update/activity-update.component';


@NgModule({
    declarations: [
        ActivityAddComponent,
        ActivityComponent,
        EventComponent,
        CourseComponent,
        ActivityUpdateComponent
    ],
    imports: [
        ComponentModule,
        ActivityRouter,
        BaseModule
    ]

})

export class ActivityModule { }