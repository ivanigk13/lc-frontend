import { NgModule } from "@angular/core";
import { ActivityRouter } from "./activity.router";
import { ActivityComponent } from './activity/activity.component';
import { BaseModule } from "../../base/base.module";
import { ComponentModule } from "../../components/component.module";
import { ReportParticipantActivityComponent } from './report-participant-activity/report-participant-activity.component';
import { ReportIncomeActivityComponent } from './report-income-activity/report-income-activity.component';


@NgModule({
    declarations: [
        ActivityComponent,
        ReportParticipantActivityComponent,
        ReportIncomeActivityComponent,
    ],
    imports: [
        ComponentModule,
        ActivityRouter,
        BaseModule
    ]

})

export class ActivityModule { }