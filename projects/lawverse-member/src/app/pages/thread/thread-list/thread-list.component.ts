import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class ThreadListComponent implements OnInit, OnDestroy {

  threads : GetThreadDtoDataRes[] = []
  likeCounters : number[] = []
  commentCounters : number[] = []
  events: GetActivityDtoDataRes[] = []
  courses: GetActivityDtoDataRes[] = []

  getEventSubs!: Subscription
  getCourseSubs!: Subscription 
  getAllThreadSubs? : Subscription
  counterSubs? : Subscription

  constructor(private title:Title, private router : Router, private threadService:ThreadService, private threadLikeService:ThreadLikeService,
              private threadDetailService:ThreadDetailService, private activityService : ActivityService) {
    this.title.setTitle('Thread List')
  }

  ngOnInit(): void {
    this.getAllThreadSubs = this.threadService.getAll().subscribe(result=>{
      this.threads = result.data      
      for(let i = 0; i < this.threads.length; i++){
        this.threadLikeService.getLikeCounterByThreadId(this.threads[i].id).subscribe(result=>{
          this.likeCounters.push(result)
        })
        this.threadDetailService.getCommentTotalByThreadId(this.threads[i].id).subscribe(result=>{
          this.commentCounters.push(result)
        })
      }
    })
    this.getLastTwoCourse()
    this.getLastTwoEvent()
  }

  getLastTwoEvent(): void {
    this.getEventSubs = this.activityService.getLastTwoEvent().subscribe(result => this.events = result.data)
  }

  getLastTwoCourse(): void {
    this.getCourseSubs = this.activityService.getLastTwoCourse().subscribe(result => this.courses = result.data)
  }

  onClick(id : string) : void {
    this.router.navigateByUrl(`/member/thread/${id}`)
  }

  ngOnDestroy(): void {
    this.getAllThreadSubs.unsubscribe()
    this.getEventSubs.unsubscribe()
    this.getCourseSubs.unsubscribe()
  }


}
