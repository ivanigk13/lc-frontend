import { NgModule } from "@angular/core";
import { BaseModule } from "../../base/base.module"
import { HomeRouter } from "./home.router";
import { HomeComponent } from './home.component';
import { ComponentModule } from "src/app/components/component.module";


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        ComponentModule,
        BaseModule,
        HomeRouter,
    ]

})

export class HomeModule { }