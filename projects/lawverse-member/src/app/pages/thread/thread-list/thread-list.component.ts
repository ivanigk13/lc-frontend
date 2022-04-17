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
import { ThreadBookmarkService } from '../../../service/thread-bookmark-service';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {

  threads: GetThreadDtoDataRes[] = []
  bookmarkedThreads: GetThreadDtoDataRes[] = []
  likeCounters : number[] = []
  commentCounters : number[] = []  
  bookmarkedLikeCounters: number[] = []
  bookmarkedCommentCounters: number[] = []
  events$: Observable<GetActivityDtoDataRes[]>
  courses$: Observable<GetActivityDtoDataRes[]>
  initialPage: number = 0
  maxPage: number = 5  

  constructor(private title:Title, private router : Router, private threadService:ThreadService, private threadLikeService:ThreadLikeService,
              private threadDetailService:ThreadDetailService, private activityService : ActivityService, 
              private threadBookmarkService : ThreadBookmarkService, private loginService : LoginService) {
    this.title.setTitle('Thread List')
  }

  ngOnInit(): void {
    this.getAllThread()
    this.getBookmarkedThread()
    this.getLastTwoCourse()
    this.getLastTwoEvent()
  }

  async getAllThread() : Promise<void> {
    this.threads = await firstValueFrom(this.threadService.getAll(this.initialPage, this.maxPage).pipe(map(result => result.data)))
    if(this.threads) {
      for (let i = 0; i < this.threads.length; i++) {
        let like = await firstValueFrom(this.threadLikeService.getLikeCounterByThreadId(this.threads[i].id).pipe(map(result => result)))
         if(like) this.likeCounters.push(like)        

        let commentCounter = await firstValueFrom(this.threadDetailService.getCommentTotalByThreadId(this.threads[i].id).pipe(map(result => result)))
        if(commentCounter) this.commentCounters.push(commentCounter)                   
      }
    }
  }

  async getBookmarkedThread(): Promise<void> {
    const userId = this.loginService.getData().id
    const bookmarkList = await firstValueFrom(this.threadBookmarkService.getThreadBookmarkByUserId(userId).pipe(map(result => result.data)))
    if (bookmarkList) {
      for (let i = 0; i < bookmarkList.length; i++) {
        const thread = await firstValueFrom(this.threadService.getById(bookmarkList[i].threadId).pipe(map(result => result.data)))
        console.log(thread)
        if (thread) {
          this.bookmarkedThreads.push(thread)
          
          let like = await firstValueFrom(this.threadLikeService.getLikeCounterByThreadId(thread.id).pipe(map(result => result)))
          console.log(like)
          if (like) this.bookmarkedLikeCounters.push(like)

          let totalComment = await firstValueFrom(this.threadDetailService.getCommentTotalByThreadId(thread.id).pipe(map(result => result)))
          console.log(totalComment)
          if (totalComment) this.bookmarkedCommentCounters.push(totalComment)
        }
      }
    }
  }


  async onScroll() : Promise<void> {
    this.initialPage = this.initialPage + 5
    const result = await firstValueFrom(this.threadService.getAll(this.initialPage, this.maxPage).pipe(map(result => result.data)))
    if(result) this.threads = [...this.threads, ...result]
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
