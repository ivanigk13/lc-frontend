import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleAddComponent } from "./article-add/article-add.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleSingleComponent } from "./article-single/article-single.component";

const routes: Routes = [
    {
        path: '',
        component: ArticleListComponent
    },
    {
        path: 'new',
        component: ArticleAddComponent
    },
    {
        path: 'single',
        component: ArticleSingleComponent
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

export class ArticleRouter { }