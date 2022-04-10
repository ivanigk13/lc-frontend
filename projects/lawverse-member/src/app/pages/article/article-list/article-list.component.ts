import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';
import { GetArticleDtoDataRes } from '../../../dto/article/get-article-dto-data-res';
import { ArticleService } from '../../../service/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  articles : GetArticleDtoDataRes[] = []
  events : GetActivityDtoDataRes[] = []
  courses : GetActivityDtoDataRes[] = []
  getAllSubs !: Subscription   
  getEventSubs! : Subscription
  getCourseSubs! : Subscription 

  constructor(private articleService : ArticleService, private activityService : ActivityService) { } 

  ngOnInit(): void {
    this.getAll()
    this.getLastTwoCourse()
    this.getLastTwoEvent()
  }

  getAll() : void {
    this.getAllSubs = this.articleService.getAll().subscribe(result => this.articles = result.data)
  }

  getLastTwoEvent() : void {
    this.getEventSubs = this.activityService.getLastTwoEvent().subscribe(result => this.events = result.data)
  }

  getLastTwoCourse() : void {
    this.getCourseSubs = this.activityService.getLastTwoCourse().subscribe(result => this.courses = result.data)
  }

  onClick(index : number) : void {
    this.articles[index].clicked = true
  }

  ngOnDestroy(): void {
    this.getAllSubs.unsubscribe()
    this.getEventSubs.unsubscribe()
    this.getCourseSubs.unsubscribe()
  }

}
