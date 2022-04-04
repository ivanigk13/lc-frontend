import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetArticleDtoDataRes } from 'src/app/dto/article/get-article-dto-data-res';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  articles : GetArticleDtoDataRes[] = []
  getAllSubs !: Subscription 

  constructor(private articleService : ArticleService) { } 

  ngOnInit(): void {
    this.getAll()
  }

  getAll() : void {
    this.getAllSubs = this.articleService.getAll().subscribe(result => this.articles = result.data)
  }

  ngOnDestroy(): void {
    this.getAllSubs.unsubscribe()
  }

}
