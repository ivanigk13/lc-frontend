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
import { LoginService } from '../../../service/login.service';
import { RoleList } from '../../../constant/role-list';

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
  initialPage: number = 0
  maxPage: number = 5
  isPremium : boolean = false

  constructor(private title:Title, private router : Router, private threadService:ThreadService, private threadLikeService:ThreadLikeService,
              private threadDetailService:ThreadDetailService, private activityService : ActivityService,
              private loginService : LoginService) {
    this.title.setTitle('Thread List')
  }

  ngOnInit(): void {
    this.getAllThread()
    this.getLastTwoCourse()
    this.getLastTwoEvent()
  }

  async getAllThread() : Promise<void> {
    this.threads = await firstValueFrom(this.threadService.getAll(this.initialPage, this.maxPage).pipe(map(result => result.data)))
    if(this.threads) {

      const user = this.loginService.getData()
      if (user.roleCode == RoleList.PREMIUM) this.isPremium = true

      for (let i = 0; i < this.threads.length; i++) {
        let like = await firstValueFrom(this.threadLikeService.getLikeCounterByThreadId(this.threads[i].id).pipe(map(result => result)))        
        if(like > 0) this.likeCounters.push(like)                
        else if (like == 0) this.likeCounters.push(0)        
        
        let commentCounter = await firstValueFrom(this.threadDetailService.getCommentTotalByThreadId(this.threads[i].id).pipe(map(result => result)))        
        if(commentCounter > 0) this.commentCounters.push(commentCounter)  
        else if (commentCounter == 0) this.commentCounters.push(0)      
      }
    }
  }

  async onScroll() : Promise<void> {
    this.initialPage = this.initialPage + 5
    const result = await firstValueFrom(this.threadService.getAll(this.initialPage, this.maxPage).pipe(map(result => result.data)))
    this.likeCounters = []
    this.commentCounters = []
    if(result) {
      this.threads = [...this.threads, ...result]    
      for (let i = 0; i < this.threads.length; i++) {
        let like = await firstValueFrom(this.threadLikeService.getLikeCounterByThreadId(this.threads[i].id).pipe(map(result => result)))        
        if (like > 0) this.likeCounters.push(like)
        else if (like == 0) this.likeCounters.push(0)

        let commentCounter = await firstValueFrom(this.threadDetailService.getCommentTotalByThreadId(this.threads[i].id).pipe(map(result => result)))        
        if (commentCounter > 0) this.commentCounters.push(commentCounter)
        else if (commentCounter == 0) this.commentCounters.push(0)
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
