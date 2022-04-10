import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { MyActivityRouter } from "./my-activity.router";
import { MyActivityComponent } from './activity/my-activity.component';
import { ComponentModule } from "../../../../../lawverse-login/src/app/components/component.module";
import { ApproveActivityOrderComponent } from './approve-activity-order/approve-activity-order.component';

@NgModule({
    declarations: [      
    MyActivityComponent, ApproveActivityOrderComponent
  ],
    imports: [        
        BaseModule,
        MyActivityRouter,
        ComponentModule
    ]

})

export class MyActivityModule { }