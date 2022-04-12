import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { ActivityService } from '../../../service/activity.service';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { GetArticleDtoDataRes } from '../../../dto/article/get-article-dto-data-res';
import { ArticleService } from '../../../service/article.service';

@Component({
  selector: 'app-article-single',
  templateUrl: './article-single.component.html',
  styleUrls: ['./article-single.component.scss']
})
export class ArticleSingleComponent implements OnInit {

  article$: Observable<GetArticleDtoDataRes>
  events$: Observable<GetActivityDtoDataRes[]>
  courses$: Observable<GetActivityDtoDataRes[]>

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService,
    private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getArticle()
    this.getLastTwoCourse()
    this.getLastTwoEvent()
  }

  async getArticle(): Promise<void> {
    const id = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
    if (id) {
      this.article$ = this.articleService.getById((id as any).id).pipe(map(result => result.data))      
    }
  }

  getLastTwoEvent(): void {
    this.events$ = this.activityService.getLastTwoEvent().pipe(map(result => result.data))
  }

  getLastTwoCourse(): void {
    this.courses$ = this.activityService.getLastTwoCourse().pipe(map(result => result.data))
  }

}
