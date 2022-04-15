import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityAddComponent } from "./activity-add/activity-add.component";
import { ActivityUpdateComponent } from "./activity-update/activity-update.component";
import { ActivityComponent } from "./activity/activity.component";
import { CourseComponent } from "./course/course.component";
import { EventComponent } from "./event/event.component";



const routes: Routes = [
    {
        path: '',
        component: ActivityComponent
    },
    {
        path: 'new',
        component: ActivityAddComponent
    },
    {
        path: 'course',
        component: CourseComponent
    },
    {
        path: 'event',
        component: EventComponent
    },
    {
        path: ':id',
        component: ActivityUpdateComponent
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