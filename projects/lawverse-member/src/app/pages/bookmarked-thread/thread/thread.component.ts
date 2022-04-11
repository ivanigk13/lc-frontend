import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../service/login.service';
import { GetThreadBookmarkDtoDataRes } from '../../../dto/thread-bookmark/get-thread-bookmark-dto-data-res';
import { GetThreadDtoDataRes } from '../../../dto/thread/get-thread-dto-data-res';
import { ThreadBookmarkService } from '../../../service/thread-bookmark-service';
import { ThreadService } from '../../../service/thread.service';
import { ThreadLikeService } from '../../../service/thread-like.service';
import { ThreadDetailService } from '../../../service/thread-detail.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit, OnDestroy {

  thread : GetThreadDtoDataRes
  threads : GetThreadDtoDataRes [] = []
  bookmarks : GetThreadBookmarkDtoDataRes [] = []
  likeCounters: number[] = []
  commentCounters: number[] = []
  userId: string
  bookmarkSubs? : Subscription
  

  
  constructor(private threadBookmarkService : ThreadBookmarkService, private threadService : ThreadService, 
    private loginService : LoginService, private threadLikeService : ThreadLikeService,
    private threadDetailService : ThreadDetailService) { }

  ngOnInit(): void {
    this.getThread()
  }

  getThread() : void {
    this.userId = this.loginService.getData().id
    this.bookmarkSubs = this.threadBookmarkService.getThreadBookmarkByUserId(this.userId).subscribe(result => {
      this.bookmarks = result.data
      console.log(this.bookmarks)
      for(let i = 0; i < this.bookmarks.length; i++){
        this.threadService.getById(this.bookmarks[i].threadId).subscribe(result => {
          this.thread = result.data
          console.log(this.thread)
          this.threads.push(this.thread)
          for (let j = 0; j < this.threads.length; j++) {
            this.threadLikeService.getLikeCounterByThreadId(this.threads[j].id).subscribe(result => {
              this.likeCounters.push(result)
            })
            this.threadDetailService.getCommentTotalByThreadId(this.threads[j].id).subscribe(result => {
              this.commentCounters.push(result)
            })
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.bookmarkSubs?.unsubscribe()
  }

}
