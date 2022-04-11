import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThreadLikeService } from '../../../service/thread-like.service';
import { GetThreadDetailDtoDataRes } from '../../../dto/thread-detail/get-thread-detail-dto-data-res';
import { GetThreadDtoDataRes } from '../../../dto/thread/get-thread-dto-data-res';
import { ThreadDetailService } from '../../../service/thread-detail.service';
import { ThreadService } from '../../../service/thread.service';
import { InsertThreadDetailDtoReq } from '../../../dto/thread-detail/insert-thread-detail-dto-req';
import { InsertThreadLikeDtoReq } from '../../../dto/thread-like/insert-thread-like-dto-req';
import { LoginService } from '../../../service/login.service';
import { GetThreadLikeDtoDataRes } from '../../../dto/thread-like/get-thread-like-dto-data-res';
import { PollingHeaderService } from '../../../service/polling-header.service';
import { PollingDetailService } from '../../../service/polling-detail.service';
import { GetPollingHeaderDtoDataRes } from '../../../dto/polling-header/get-polling-header-dto-data-res';
import { GetPollingDetailDtoDataRes } from '../../../dto/polling-detail/get-polling-detail-dto-data-res';
import { PollingVoterService } from '../../../service/polling-voter.service';
import { InsertPollingVoterDtoReq } from '../../../dto/polling-voter/insert-polling-voter-dto-req';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';
import { InsertThreadBookmarkDtoReq } from '../../../dto/thread-bookmark/insert-thread-bookmark-dto-req';
import { ThreadBookmarkService } from '../../../service/thread-bookmark-service';

@Component({
  selector: 'app-thread-single',
  templateUrl: './thread-single.component.html',
  styleUrls: ['./thread-single.component.scss']
})
export class ThreadSingleComponent implements OnInit, OnDestroy {

  thread!: GetThreadDtoDataRes
  pollingHeader!: GetPollingHeaderDtoDataRes
  pollingDetails: GetPollingDetailDtoDataRes[] = []
  threadDetail: InsertThreadDetailDtoReq = new InsertThreadDetailDtoReq()
  threadLike: InsertThreadLikeDtoReq = new InsertThreadLikeDtoReq()
  pollingVoter: InsertPollingVoterDtoReq = new InsertPollingVoterDtoReq()
  threadBookmark: InsertThreadBookmarkDtoReq = new InsertThreadBookmarkDtoReq()
  threadDetails: GetThreadDetailDtoDataRes[] = []
  likeData: GetThreadLikeDtoDataRes
  events: GetActivityDtoDataRes[] = []
  courses: GetActivityDtoDataRes[] = []
  likeCounter: number
  totalPolling: number = 0
  pollingCounters: number[] = []
  commentCounter: number
  isLike: boolean = false
  isVote: boolean = false
  isBookmark: boolean = false
  userId: string

  insertThreadDetailSubs?: Subscription
  pollingVoterSubs?: Subscription
  threadBookmarkSubs?: Subscription
  threadLikeSubs?: Subscription
  threadDislikeSubs?: Subscription
  threadDetailSubs?: Subscription
  activeRouteSubs?: Subscription
  threadSubs?: Subscription
  getEventSubs!: Subscription
  getCourseSubs!: Subscription


  constructor(private activatedRoute: ActivatedRoute, private threadService: ThreadService,
    private threadDetailService: ThreadDetailService, private threadLikeService: ThreadLikeService,
    private loginService: LoginService, private pollingHeaderService: PollingHeaderService,
    private pollingDetailService: PollingDetailService, private pollingVoterService: PollingVoterService,
    private activityService: ActivityService, private threadBookmarkService: ThreadBookmarkService) { }

  ngOnInit(): void {
    this.getData()
    this.getLastTwoCourse()
    this.getLastTwoEvent()
  }

  getData(): void {
    this.threadSubs = this.activatedRoute.params.subscribe(result => {
      this.threadService.getById((result as any).id).subscribe(result => {
        this.thread = result.data

        this.threadDetailService.getAllByThreadId(this.thread.id).subscribe(result => {
          this.threadDetails = result.data
        })

        if (this.thread.threadTypeName == 'Polling') {
          this.pollingHeaderService.getByThreadId(this.thread.id).subscribe(result => {
            if (result.data != null) {
              this.pollingHeader = result.data

              this.pollingDetailService.getAllByHeaderId(this.pollingHeader.id).subscribe(result => {
                this.pollingDetails = result.data
                console.log(this.pollingDetails)
                this.totalPollingCount()
              })
            }
          })
        }

        this.userId = this.loginService.getData().id

        this.threadLikeService.isUserLikeByThreadId(this.thread.id, this.userId).subscribe(result => {
          if (result == 1) {
            this.isLike = true
          }
        })

        this.threadBookmarkSubs = this.threadBookmarkService.getThreadBookmarkByThreadId(this.thread.id).subscribe(result => {
          this.isBookmark = true
        })
        this.threadLikeService.getLikeCounterByThreadId(this.thread.id).subscribe(result => {
          this.likeCounter = result
        })
        this.threadDetailService.getCommentTotalByThreadId(this.thread.id).subscribe(result => {
          this.commentCounter = result
        })

      })
    })
  }

  getLastTwoEvent(): void {
    this.getEventSubs = this.activityService.getLastTwoEvent().subscribe(result => this.events = result.data)
  }

  getLastTwoCourse(): void {
    this.getCourseSubs = this.activityService.getLastTwoCourse().subscribe(result => this.courses = result.data)
  }

  totalPollingCount(): void {
    for (let i = 0; i < this.pollingDetails.length; i++) {
      this.totalPolling += this.pollingDetails[i].pollingCounter
    }
    for (let j = 0; j < this.pollingDetails.length; j++) {
      let polling: number = (this.pollingDetails[j].pollingCounter * 100) / this.totalPolling
      this.pollingCounters.push(polling)
    }
  }

  onVote(index: number, isVote: boolean): void {
    this.pollingVoterSubs = this.pollingVoterService.getCountIdByHeaderId(this.pollingHeader.id, this.userId).subscribe(result => {
      if (result == 1) {
        isVote = true
      }
      if (isVote == false) {
        this.pollingCounters = []
        this.totalPolling = 0
        this.pollingVoter.pollingDetailId = this.pollingDetails[index].id
        this.pollingVoterService.insert(this.pollingVoter).subscribe(result => {
          if (result) {
            this.pollingDetails[index].pollingCounter = this.pollingDetails[index].pollingCounter + 1
            this.pollingDetailService.update(this.pollingDetails[index]).subscribe(result => {
              if (result) {
                this.getData()
              }
            })
          }
        })
      }
    })
  }

  onLike(like: boolean): void {
    if (!like) {
      this.threadLike.threadId = this.thread.id
      this.threadLike.userId = this.loginService.getData().id
      this.threadLike.likeCounter = 1
      this.threadLikeSubs = this.threadLikeService.insert(this.threadLike).subscribe(result => {
        if (result) {
          this.isLike = true
          this.getData()
        }
      })
    }
  }

  onBookmark(): void {
    if (!this.isBookmark) {
      this.threadBookmark.userId = this.userId
      this.threadBookmark.threadId = this.thread.id
      this.threadBookmarkService.insert(this.threadBookmark).subscribe(result => {
        if (result) {
          this.isBookmark = true
          this.getData()
        }
      })
    }
  }

  onDislike(id: string): void {
    this.threadDislikeSubs = this.threadLikeService.delete(id).subscribe()
  }

  onSubmit(data: boolean): void {
    if (data) {
      this.pollingCounters = []
      this.totalPolling = 0
      this.threadDetail.threadId = this.thread.id
      this.insertThreadDetailSubs = this.threadDetailService.insert(this.threadDetail).subscribe(result => {
        if (result) {
          this.getData()
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.activeRouteSubs?.unsubscribe()
    this.threadSubs?.unsubscribe()
    this.getCourseSubs?.unsubscribe()
    this.getEventSubs?.unsubscribe()
    this.threadLikeSubs?.unsubscribe()
    this.threadBookmarkSubs?.unsubscribe()
  }

}
