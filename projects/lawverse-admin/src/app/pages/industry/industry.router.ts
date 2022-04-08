import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndustryAddComponent } from "./industry-add/industry-add.component";
import { IndustryListComponent } from "./industry-list/industry-list.component";
import { IndustryUpdateComponent } from "./industry-update/industry-update.component";

const routes: Routes = [
    {
        path: 'list',
        component: IndustryListComponent
    },
    {
        path: 'new',
        component: IndustryAddComponent
    },
    {
        path: ':id',
        component: IndustryUpdateComponent
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

export class IndustryRouter { }