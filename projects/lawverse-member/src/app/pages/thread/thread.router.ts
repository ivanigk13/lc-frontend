import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ThreadAddComponent } from "./thread-add/thread-add.component";
import { ThreadListComponent } from "./thread-list/thread-list.component";

const routes: Routes = [
    { path: 'list', component: ThreadListComponent },
    { path: 'new', component: ThreadAddComponent },

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        HttpClientModule,
        
    ],
    declarations: [
        ThreadAddComponent,
        ThreadListComponent,
    ]
})

export class AdminLayoutModule { }