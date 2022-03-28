import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryAddComponent } from "./category-add/category-add.component";
import { CategoryListComponent } from "./category-list/category-list.component";

const routes: Routes = [
    {
        path: 'list',
        component: CategoryListComponent
    },
    {
        path: 'new',
        component: CategoryAddComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class CategoryRouter { }