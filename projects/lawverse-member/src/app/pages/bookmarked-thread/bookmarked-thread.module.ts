import { NgModule } from "@angular/core";
import { ComponentModule } from "src/app/components/component.module";
import { BaseModule } from "../../base/base.module";
import { BookmarkedThreadRouter } from "./bookmarked-thread.router";
import { ThreadComponent } from './thread/thread.component';

@NgModule({
    declarations: [
        ThreadComponent
    ],
    imports: [
        BaseModule,
        ComponentModule,
        BookmarkedThreadRouter
    ]

})

export class BookmarkedThreadModule { }