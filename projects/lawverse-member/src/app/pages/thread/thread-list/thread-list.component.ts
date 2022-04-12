import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { ActivityService } from '../../../service/activity.service';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { GetThreadDtoDataRes } from '../../../dto/thread/get-thread-dto-data-res';
import { ThreadDetailService } from '../../../service/thread-detail.service';
import { ThreadLikeService } from '../../../service/thread-like.service';
import { ThreadService } from '../../../service/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {

  threads: GetThreadDtoDataRes[] = []
  likeCounters : number[] = []
  commentCounters : number[] = []
  events$: Observable<GetActivityDtoDataRes[]>
  courses$: Observable<GetActivityDtoDataRes[]>

  getAllThreadSubs? : Subscription
  counterSubs? : Subscription

  constructor(private title:Title, private router : Router, private threadService:ThreadService, private threadLikeService:ThreadLikeService,
              private threadDetailService:ThreadDetailService, private activityService : ActivityService) {
    this.title.setTitle('Thread List')
  }

  ngOnInit(): void {
    this.getAllThread()
    this.getLastTwoCourse()
    this.getLastTwoEvent()
  }

  async getAllThread() : Promise<void> {
    this.threads = await firstValueFrom(this.threadService.getAll().pipe(map(result => result.data)))
    if(this.threads) {
      for (let i = 0; i < this.threads.length; i++) {
        let like = await firstValueFrom(this.threadLikeService.getLikeCounterByThreadId(this.threads[i].id).pipe(map(result => result)))
         if(like) this.likeCounters.push(like)        

        let commentCounter = await firstValueFrom(this.threadDetailService.getCommentTotalByThreadId(this.threads[i].id).pipe(map(result => result)))
        if(commentCounter) this.commentCounters.push(commentCounter)        
      }
    }
  }

  getLastTwoEvent(): void {
    this.events$ = this.activityService.getLastTwoEvent().pipe(map(result => result.data))
  }

  getLastTwoCourse(): void {
    this.courses$ = this.activityService.getLastTwoCourse().pipe(map(result => result.data))
  }

  onClick(id : string) : void {
    this.router.navigateByUrl(`/member/thread/${id}`)
  }
}
