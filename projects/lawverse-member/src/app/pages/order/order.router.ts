import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityComponent } from "./activity/activity.component";
import { OrderStatusComponent } from "./order-status/order-status.component";
import { OrderSubscriptionComponent } from "./order-subscription/order-subscription.component";
import { SubscribtionComponent } from "./subscribtion/subscribtion.component";



const routes: Routes = [
    {
        path: 'subscribtion',
        component: SubscribtionComponent
    }  
    {
        path: 'status',
        component: OrderStatusComponent
    },
    {
        path: 'order-subscription',
        component: OrderSubscriptionComponent
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

export class OrderRouter { }