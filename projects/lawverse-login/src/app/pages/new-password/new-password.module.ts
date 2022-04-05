import { NgModule } from "@angular/core";
import { BaseModule } from "../../base/base.module";
import { NewPasswordComponent } from './new-password.component'


@NgModule({
    declarations: [
        NewPasswordComponent
    ],
    imports: [
        BaseModule,
        
    ]

})

export class NewPasswordModule { }