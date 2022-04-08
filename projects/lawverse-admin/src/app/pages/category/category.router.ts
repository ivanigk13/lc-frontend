import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryAddComponent } from "./category-add/category-add.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryUpdateComponent } from "./category-update/category-update.component";

const routes: Routes = [
    {
        path: 'list',
        component: CategoryListComponent
    },
    {
        path: 'new',
        component: CategoryAddComponent
    },
    {
        path: ':id',
        component: CategoryUpdateComponent
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