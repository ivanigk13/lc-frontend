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
  threadDetails: GetThreadDetailDtoDataRes[] = []
  likeData: GetThreadLikeDtoDataRes
  insertThreadDetailSubs?: Subscription
  pollingVoterSubs?: Subscription
  threadLikeSubs?: Subscription
  threadDislikeSubs?: Subscription
  likeCounter: number
  totalPolling: number = 0
  pollingCounters: number[] = []
  commentCounter: number
  threadDetailSubs?: Subscription
  activeRouteSubs?: Subscription
  threadSubs?: Subscription
  isLike: boolean = false
  isVote: boolean = false

  constructor(private activatedRoute: ActivatedRoute, private threadService: ThreadService,
    private threadDetailService: ThreadDetailService, private threadLikeService: ThreadLikeService,
    private loginService: LoginService, private pollingHeaderService: PollingHeaderService,
    private pollingDetailService: PollingDetailService, private pollingVoterService: PollingVoterService) { }

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

  totalPollingCount(): void {
    for (let i = 0; i < this.pollingDetails.length; i++) {
      this.totalPolling += this.pollingDetails[i].pollingCounter      
    }
    for (let j= 0; j < this.pollingDetails.length; j++){
      let polling: number = (this.pollingDetails[j].pollingCounter * 100) / this.totalPolling
      this.pollingCounters.push(polling)
    }
  }

  onVote(index: number, isVote: boolean): void {
    const userId = this.loginService.getData().id
    this.pollingVoterSubs = this.pollingVoterService.getCountIdByHeaderId(this.pollingHeader.id, userId).subscribe(result => {
      if(result == 1){
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
