import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetThreadDtoDataRes } from '../../../dto/thread/get-thread-dto-data-res';
import { ThreadDetailService } from '../../../service/thread-detail.service';
import { ThreadLikeService } from '../../../service/thread-like.service';
import { ThreadService } from '../../../service/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit, OnDestroy {

  threads : GetThreadDtoDataRes[] = []
  likeCounters : number[] = []
  commentCounters : number[] = []

  getAllThreadSubs? : Subscription
  counterSubs? : Subscription

  constructor(private title:Title, private router : Router, private threadService:ThreadService, private threadLikeService:ThreadLikeService,
              private threadDetailService:ThreadDetailService) {
    this.title.setTitle('Thread List')
  }

  ngOnInit(): void {
    this.getAllThreadSubs = this.threadService.getAll().subscribe(result=>{
      this.threads = result.data
      console.log(this.threads)
      for(let i = 0; i < this.threads.length; i++){
        this.threadLikeService.getLikeCounterByThreadId(this.threads[i].id).subscribe(result=>{
          this.likeCounters.push(result)
        })
        this.threadDetailService.getCommentTotalByThreadId(this.threads[i].id).subscribe(result=>{
          this.commentCounters.push(result)
        })
      }
    })
  }

  onClick(id : string) : void {
    this.router.navigateByUrl(`/member/thread/${id}`)
  }

  ngOnDestroy(): void {
    this.getAllThreadSubs.unsubscribe()
  }


}
