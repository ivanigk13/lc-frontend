import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';
import { GetArticleDtoDataRes } from '../../../dto/article/get-article-dto-data-res';
import { ArticleService } from '../../../service/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit{

  articles$: Observable<GetArticleDtoDataRes[]>
  events$: Observable<GetActivityDtoDataRes[]>
  courses$: Observable<GetActivityDtoDataRes[]>

  constructor(private articleService : ArticleService, private activityService : ActivityService, 
    private router : Router) { } 

  ngOnInit(): void {
    this.getAll()
    this.getLastTwoCourse()
    this.getLastTwoEvent()
  }

  getAll() : void {
    this.articles$ = this.articleService.getAll().pipe(map(result => result.data))
  }

  getLastTwoEvent() : void {
    this.events$ = this.activityService.getLastTwoEvent().pipe(map(result => result.data))
  }

  getLastTwoCourse() : void {
    this.courses$ = this.activityService.getLastTwoCourse().pipe(map(result => result.data))
  }

  onReadMore(id : string) : void {
    this.router.navigateByUrl(`/member/article/${id}`)
  }

}
