import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { UserListComponent } from "./user-list/user-list.component";
import { UserRouter } from "./user.router";

@NgModule({
    declarations: [
        UserListComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        UserRouter
    ]

})

export class UserModule { }