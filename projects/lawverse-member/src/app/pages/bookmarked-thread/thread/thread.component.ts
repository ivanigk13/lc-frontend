import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
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
export class ThreadComponent implements OnInit {


  threads: GetThreadDtoDataRes[] = []
  bookmarks: GetThreadBookmarkDtoDataRes[]
  likeCounters: number[] = []
  commentCounters: number[] = []
  userId: string


  constructor(private threadBookmarkService: ThreadBookmarkService, private threadService: ThreadService,
    private loginService: LoginService, private threadLikeService: ThreadLikeService,
    private threadDetailService: ThreadDetailService) { }

  ngOnInit(): void {
    this.getThread()
  }

  async getThread(): Promise<void> {
    this.userId = this.loginService.getData().id
    const threadList = await firstValueFrom(this.threadBookmarkService.getThreadBookmarkByUserId(this.userId).pipe(map(result => result.data)))    
    if(threadList) {
      for (let i = 0; i < threadList.length; i++) {
        const thread = await firstValueFrom(this.threadService.getById(threadList[i].threadId).pipe(map(result => result.data)))
          
          if(thread) this.threads.push(thread)
          for (let j = 0; j < this.threads.length; j++) {
            let like = await firstValueFrom(this.threadLikeService.getLikeCounterByThreadId(this.threads[j].id).pipe(map(result => result)))
            if(like) this.likeCounters.push(like)            

            let totalComment = await firstValueFrom(this.threadDetailService.getCommentTotalByThreadId(this.threads[j].id).pipe(map(result => result)))
            if(totalComment)this.commentCounters.push(totalComment)            
          }
        }
      }
    }
  }
