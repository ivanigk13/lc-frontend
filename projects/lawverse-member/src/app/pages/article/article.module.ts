import { NgModule } from "@angular/core";
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleAddComponent } from './article-add/article-add.component';
import { BaseModule } from "src/app/base/base.module";
import { ComponentModule } from "../../../../../lawverse-login/src/app/components/component.module";
import { ArticleRouter } from "./article.router";
import { ArticleSingleComponent } from './article-single/article-single.component';

@NgModule({
    declarations: [
        ArticleListComponent,
        ArticleAddComponent,
        ArticleSingleComponent
    ],
    imports: [
        ArticleRouter,
        BaseModule,
        ComponentModule,
    ]

})

export class ArticleModule { }