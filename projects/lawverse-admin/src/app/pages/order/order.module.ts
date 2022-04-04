import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { ComponentModule } from "src/app/components/component.module";
import { OrderRouter } from "./order.router";
import { SubscribtionComponent } from './subscribtion/subscribtion.component';
import { ActivityComponent } from './activity/activity.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderActivityComponent } from './order-activity/order-activity.component';
import { OrderSubscriptionComponent } from './order-subscription/order-subscription.component';


@NgModule({
    declarations: [
        SubscribtionComponent,
        ActivityComponent,
        OrderStatusComponent,
        OrderActivityComponent,
        OrderSubscriptionComponent
    ],
    imports: [
        ComponentModule,
        OrderRouter,
        BaseModule
    ]

})

export class OrderModule { }