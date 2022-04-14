import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityComponent } from "./activity/activity.component";
import { ReportIncomeActivityComponent } from "./report-income-activity/report-income-activity.component";
import { ReportParticipantActivityComponent } from "./report-participant-activity/report-participant-activity.component";



const routes: Routes = [
    {
        path: '',
        component: ActivityComponent
    },
    {
        path: 'list',
        component: ReportParticipantActivityComponent
    },
    {
        path: 'list/income',
        component: ReportIncomeActivityComponent
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