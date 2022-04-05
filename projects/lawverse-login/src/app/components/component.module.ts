import { NgModule } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        MenubarModule
    ],
    exports: [
        NavbarComponent
    ]
})

export class ComponentModule { }