import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadAddComponent } from "./thread-add/thread-add.component";
import { ThreadListComponent } from "./thread-list/thread-list.component";


const routes: Routes = [
    {
        path: '',
        component: ThreadListComponent
    },
    {
        path: 'new',
        component: ThreadAddComponent
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

export class ThreadRouter { }