import { NgModule } from "@angular/core";
import { BaseModule } from "../../base/base.module";
import { RegisterVerificarionRouter } from "./register-verification.router";
import { VerificationComponent } from "./verification/verification.component";

@NgModule({
    declarations:[
        VerificationComponent
    ],
    imports: [
        BaseModule,
        RegisterVerificarionRouter
    ]

})
export class RegisterVerificarionModule{}