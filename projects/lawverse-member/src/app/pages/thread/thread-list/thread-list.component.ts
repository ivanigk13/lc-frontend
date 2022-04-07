import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
export class ThreadListComponent implements OnInit {

  threads : GetThreadDtoDataRes[] = []
  likeCounters : number[] = []
  commentCounters : number[] = []

  getAllThreadSubs? : Subscription
  counterSubs? : Subscription

  constructor(private title:Title, private threadService:ThreadService, private threadLikeService:ThreadLikeService,
              private threadDetailService:ThreadDetailService) {
    title.setTitle('Thread List')
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

}
