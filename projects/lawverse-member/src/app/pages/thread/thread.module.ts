import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { ThreadAddComponent } from './thread-add/thread-add.component';
import { ThreadRouter } from "./thread.router";
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ComponentModule } from "../../../app/components/component.module";
import { ThreadSingleComponent } from './thread-single/thread-single.component';


@NgModule({
  declarations: [
    ThreadAddComponent,
    ThreadListComponent,
    ThreadSingleComponent
  ],
  imports: [
    ThreadRouter,
    BaseModule,
    ComponentModule
  ]

})

export class ThreadModule { }