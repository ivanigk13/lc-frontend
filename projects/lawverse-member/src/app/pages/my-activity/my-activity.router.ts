import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyActivityComponent } from "./activity/my-activity.component";
import { ApproveActivityOrderComponent } from "./approve-activity-order/approve-activity-order.component";


const routes: Routes = [
    {
        path: '',
        component: MyActivityComponent
    },
    {
        path:':id',
        component: ApproveActivityOrderComponent
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

export class MyActivityRouter { }