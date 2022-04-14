import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { ComponentModule } from "src/app/components/component.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRouter } from "./profile.router";
import { TabViewModule } from "primeng/tabview";


@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        ComponentModule,
        BaseModule,
        ProfileRouter,
        TabViewModule,        
    ]

})

export class ProfileModule { }