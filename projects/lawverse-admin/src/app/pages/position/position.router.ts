import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PositionAddComponent } from "./position-add/position-add.component";
import { PositionListComponent } from "./position-list/position-list.component";


const routes: Routes = [
    {
        path: 'list',
        component: PositionListComponent
    },
    {
        path: 'new',
        component: PositionAddComponent
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

export class PositionRouter { }