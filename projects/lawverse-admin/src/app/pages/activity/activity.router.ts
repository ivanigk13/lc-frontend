import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityAddComponent } from "./activity-add/activity-add.component";
import { ActivityComponent } from "./activity/activity.component";
import { CourseComponent } from "./course/course.component";
import { EventComponent } from "./event/event.component";



const routes: Routes = [
    {
        path: '',
        component: ActivityComponent
    },
    {
        path: 'add',
        component: ActivityAddComponent
    },
    {
        path: 'course',
        component: CourseComponent
    },
    {
        path: 'event',
        component: EventComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ActivityRouter { }