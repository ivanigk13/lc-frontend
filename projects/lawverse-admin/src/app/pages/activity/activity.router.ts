import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityAddComponent } from "./activity-add/activity-add.component";



const routes: Routes = [
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