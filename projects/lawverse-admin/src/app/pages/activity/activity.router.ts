import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityAddComponent } from "./activity-add/activity-add.component";
import { ActivityComponent } from "./activity/activity.component";



const routes: Routes = [
    {
        path: '',
        component: ActivityComponent
    },
    {
        path: 'add',
        component: ActivityAddComponent
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