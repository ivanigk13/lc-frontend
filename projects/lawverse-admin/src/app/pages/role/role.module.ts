import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { RoleAddComponent } from "./role-add/role-add.component";
import { RoleListComponent } from "./role-list/role-list.component";
import { RoleRouter } from "./role.router";

@NgModule({
    declarations: [
        RoleListComponent,
        RoleAddComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        RoleRouter
    ]

})

export class RoleModule { }