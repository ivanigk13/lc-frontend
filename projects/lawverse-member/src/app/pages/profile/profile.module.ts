import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { ComponentModule } from "src/app/components/component.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRouter } from "./profile.router";

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        ComponentModule,
        BaseModule,
        ProfileRouter
    ]

})

export class ProfileModule { }