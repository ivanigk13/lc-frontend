import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map} from 'rxjs';
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
import { RoleList } from 'src/app/constant/role-list';

@Component({
  selector: 'app-thread-single',
  templateUrl: './thread-single.component.html',
  styleUrls: ['./thread-single.component.scss']
})
export class ThreadSingleComponent implements OnInit {

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
  isPremium: boolean = false
  userId: string
  threadBookmarkId: string  

  constructor(private activatedRoute: ActivatedRoute, private threadService: ThreadService,
    private threadDetailService: ThreadDetailService, private threadLikeService: ThreadLikeService,
    private loginService: LoginService, private pollingHeaderService: PollingHeaderService,
    private pollingDetailService: PollingDetailService, private pollingVoterService: PollingVoterService,
    private activityService: ActivityService, private threadBookmarkService: ThreadBookmarkService,
    private router : Router) { }

  ngOnInit(): void {
    this.getData()
    this.getLastTwoCourse()
    this.getLastTwoEvent()
  }

  async getData(): Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
    if (result) {
      this.thread = await firstValueFrom(this.threadService.getById((result as any).id).pipe(map(result => result.data)))
      if (this.thread) {
        this.threadDetails = await firstValueFrom(this.threadDetailService.getAllByThreadId(this.thread.id).pipe(map(result => result.data)))

        if (this.thread.threadTypeName == 'Polling') {
          const data = await firstValueFrom(this.pollingHeaderService.getByThreadId(this.thread.id).pipe(map(result => result.data)))
          if (data) {
            this.pollingHeader = data
            this.pollingDetails = await firstValueFrom(this.pollingDetailService.getAllByHeaderId(this.pollingHeader.id).pipe(map(result => result.data)))
            if (this.pollingDetails) this.totalPollingCount()
          }
        }

        const user = this.loginService.getData()
        if(user.roleCode == RoleList.PREMIUM) this.isPremium = true

        this.userId = user.id

        const result = await firstValueFrom(this.threadLikeService.isUserLikeByThreadId(this.thread.id, this.userId).pipe(map(result => result)))
        if (result == 1) {
          this.isLike = true
        }

        const bookmark = await firstValueFrom(this.threadBookmarkService.getThreadBookmarkByThreadId(this.thread.id))
        if(bookmark.data.id) {
          this.threadBookmarkId = bookmark.data.id
          this.isBookmark = true
        }
      
        const like = await firstValueFrom(this.threadLikeService.getLikeCounterByThreadId(this.thread.id).pipe(map(result => result)))
          if(like)this.likeCounter = like

        const totalComment = await firstValueFrom(this.threadDetailService.getCommentTotalByThreadId(this.thread.id).pipe(map(result => result)))
          if(totalComment) this.commentCounter = totalComment        
      }
    }
  }

  onOrder() : void {
    this.router.navigateByUrl('/member/order/subscribtion')
  }
  

  async getLastTwoEvent(): Promise<void> {
    this.events = await firstValueFrom(this.activityService.getLastTwoEvent().pipe(map(result => result.data)))
  }

  async getLastTwoCourse(): Promise<void> {
    this.courses = await firstValueFrom(this.activityService.getLastTwoCourse().pipe(map(result => result.data)))
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

  async onVote(index: number, isVote: boolean): Promise<void> {
    const result = await firstValueFrom(this.pollingVoterService.getCountIdByHeaderId(this.pollingHeader.id, this.userId).pipe(map(result => result)))
      if (result == 1) {
        isVote = true
      }
      if (isVote == false) {
        this.pollingCounters = []
        this.totalPolling = 0
        this.pollingVoter.pollingDetailId = this.pollingDetails[index].id
         const insert = await firstValueFrom(this.pollingVoterService.insert(this.pollingVoter))
          if (insert) {
            this.pollingDetails[index].pollingCounter = this.pollingDetails[index].pollingCounter + 1
             const update = await firstValueFrom(this.pollingDetailService.update(this.pollingDetails[index]))
              if (update) {
                this.getData()
              }            
          }         
    }
  }

  async onLike(like: boolean): Promise<void> {
    if (!like) {
      this.threadLike.threadId = this.thread.id
      this.threadLike.userId = this.loginService.getData().id
      this.threadLike.likeCounter = 1
      const insert = await firstValueFrom(this.threadLikeService.insert(this.threadLike))
        if (insert) {
          this.isLike = true
          this.getData()
        }
 
    }
  }

  async onUnLike(like: boolean): Promise<void> {

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

  async onUnBookmark(): Promise<void> {
    if (this.threadBookmarkId) {
      const result = await firstValueFrom(this.threadBookmarkService.delete(this.threadBookmarkId))
      if (result) {
        this.isBookmark = false
        this.getData()
      }
    }
  }

  async onDislike(id: string): Promise<void> {
    this.threadLikeService.delete(id).subscribe()
  }

  async onSubmit(data: boolean): Promise<void> {
    if (data) {
      this.pollingCounters = []
      this.totalPolling = 0
      this.threadDetail.threadId = this.thread.id
      const insert = await firstValueFrom(this.threadDetailService.insert(this.threadDetail))
      if (insert) {
          this.getData()
        }      
    }
  }
}
