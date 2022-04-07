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
  threadDetails: GetThreadDetailDtoDataRes[] = []
  likeData: GetThreadLikeDtoDataRes
  insertThreadDetailSubs?: Subscription
  threadLikeSubs?: Subscription
  threadDislikeSubs?: Subscription
  likeCounter: number
  commentCounter: number
  threadDetailSubs?: Subscription
  activeRouteSubs?: Subscription
  threadSubs?: Subscription
  isLike: boolean = false

  constructor(private activatedRoute: ActivatedRoute, private threadService: ThreadService,
    private threadDetailService: ThreadDetailService, private threadLikeService: ThreadLikeService,
    private loginService: LoginService, private pollingHeaderService: PollingHeaderService,
    private pollingDetailService: PollingDetailService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {

    this.threadSubs = this.activatedRoute.params.subscribe(result => {
      this.threadService.getById((result as any).id).subscribe(result => {
        this.thread = result.data

        this.threadDetailService.getAllByThreadId(this.thread.id).subscribe(result => {
          this.threadDetails = result.data
        })

        this.pollingHeaderService.getByThreadId(this.thread.id).subscribe(result => {
          if (result.data != null) {
            this.pollingHeader = result.data

            this.pollingDetailService.getAllByHeaderId(this.pollingHeader.id).subscribe(result => {
              this.pollingDetails = result.data
            })
          }
        })        
        
        const userId: string = this.loginService.getData().id

        this.threadLikeService.isUserLikeByThreadId(this.thread.id, userId).subscribe(result => {
          if (result == 1) {
            this.isLike = true
          }
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

  onVote(index : number) : void {
    this.pollingDetails[index].pollingCounter += 1
  }

  onLike(like: boolean): void {
    if (!like) {
      this.threadLike.threadId = this.thread.id
      this.threadLike.userId = this.loginService.getData().id
      this.threadLike.likeCounter = 1
      this.threadLikeSubs = this.threadLikeService.insert(this.threadLike).subscribe(result => {
        if (result) this.getData()
      })
    }
  }

  onDislike(id: string): void {
    this.threadDislikeSubs = this.threadLikeService.delete(id).subscribe()
  }

  onSubmit(data: boolean): void {
    if (data) {
      this.threadDetail.threadId = this.thread.id
      this.insertThreadDetailSubs = this.threadDetailService.insert(this.threadDetail).subscribe(result => {
        if (result) {
          // this.getData()
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.activeRouteSubs?.unsubscribe()
    this.threadSubs?.unsubscribe()
  }

}
