import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleAddComponent } from "./role-add/role-add.component";
import { RoleListComponent } from "./role-list/role-list.component";
import { RoleUpdateComponent } from "./role-update/role-update.component";

const routes: Routes = [
    {
        path: 'list',
        component: RoleListComponent
    },
    {
        path: 'new',
        component: RoleAddComponent
    },
    {
        path: ':id',
        component: RoleUpdateComponent
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

export class RoleRouter { }