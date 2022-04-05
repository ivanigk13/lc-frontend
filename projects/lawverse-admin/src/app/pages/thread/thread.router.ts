import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadAddComponent } from "./thread-add/thread-add.component";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { ThreadSingleComponent } from "./thread-single/thread-single.component";


const routes: Routes = [
    {
        path: '',
        component: ThreadListComponent
    },
    {
        path: 'new',
        component: ThreadAddComponent
    },
    {
        path: 'single',
        component: ThreadSingleComponent
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