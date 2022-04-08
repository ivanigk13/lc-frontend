import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { CategoryAddComponent } from "./category-add/category-add.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryUpdateComponent } from "./category-update/category-update.component";
import { CategoryRouter } from "./category.router";

@NgModule({
    declarations: [
        CategoryAddComponent,
        CategoryListComponent,
        CategoryUpdateComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        CategoryRouter
    ]

})

export class CategoryModule { }