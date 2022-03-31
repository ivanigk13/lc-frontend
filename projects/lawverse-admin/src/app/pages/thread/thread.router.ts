import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadAddComponent } from "./thread-add/thread-add.component";
import { ThreadComponent } from "./thread/thread.component";


const routes: Routes = [
    {
        path: '',
        component: ThreadComponent
    },
    {
        path: 'add',
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