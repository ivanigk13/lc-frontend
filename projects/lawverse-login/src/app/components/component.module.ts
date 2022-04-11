import { NgModule } from "@angular/core";
import { BaseModule } from "../base/base.module";
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    declarations: [
        NavbarComponent        
    ],    
    imports: [
        BaseModule
    ],
    exports: [
        NavbarComponent
    ]
})

export class ComponentModule { }