import { NgModule } from "@angular/core";
import { BaseModule } from "../../base/base.module";
import { CategoryAddComponent } from "./category-add/category-add.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryRouter } from "./category.router";

@NgModule({
    declarations:[
        CategoryAddComponent,
        CategoryListComponent
    ],
    imports: [
        BaseModule,
        CategoryRouter
    ]

})

export class CategoryModule{}