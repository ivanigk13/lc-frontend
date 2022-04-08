import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UpdateActivityTransactionStatusDtoReq } from '../../../dto/activity/update-activity-transaction-status-dto-req';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnDestroy {

  activities: GetActivityDtoDataRes[] = []
  updateActivityReq: UpdateActivityTransactionStatusDtoReq = new UpdateActivityTransactionStatusDtoReq()
  getAllSubs!: Subscription
  updateApproveSubs?: Subscription
  updateRejectSubs?: Subscription

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.getAllSubs = this.activityService.getAllActivityPending().subscribe(result => {
      this.activities = result.data
      console.log(result)
    })
  }

  onApprove(id: string): void {
    this.updateActivityReq.id = id
    this.updateApproveSubs = this.activityService.updateApprove(this.updateActivityReq).subscribe(result => {
      this.getAll()
    })
  }

  onReject(id: string): void {
    this.updateActivityReq.id = id
    this.updateRejectSubs = this.activityService.updateReject(this.updateActivityReq).subscribe(result => {
      this.getAll()
    })
  }

  ngOnDestroy(): void {
    this.getAllSubs.unsubscribe()
    this.updateApproveSubs.unsubscribe()
    this.updateRejectSubs?.unsubscribe()
  }


}
