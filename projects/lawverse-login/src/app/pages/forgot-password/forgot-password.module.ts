import { NgModule } from "@angular/core";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { ForgotPasswordRouter } from "./forgot-password.router";
import { BaseModule } from "../../base/base.module"


@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports: [
        BaseModule,
        ForgotPasswordRouter,    
    ]

})

export class ForgotPasswordModule { }