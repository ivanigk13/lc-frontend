import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndustryAddComponent } from "./industry-add/industry-add.component";
import { IndustryListComponent } from "./industry-list/industry-list.component";

const routes: Routes = [
    {
        path: 'list',
        component: IndustryListComponent
    },
    {
        path: 'new',
        component: IndustryAddComponent
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