import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { ComponentModule } from "src/app/components/component.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRouter } from "./profile.router";
import { TabMenuModule } from 'primeng/tabmenu';


@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        ComponentModule,
        BaseModule,
        ProfileRouter,
        TabMenuModule,        
    ]

})

export class ProfileModule { }