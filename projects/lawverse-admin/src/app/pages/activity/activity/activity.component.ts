import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { UpdateActivityTransactionStatusDtoReq } from '../../../dto/activity/update-activity-transaction-status-dto-req';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  
  activities$: Observable<GetActivityDtoDataRes[]>
  updateActivityReq : UpdateActivityTransactionStatusDtoReq = new UpdateActivityTransactionStatusDtoReq()
  getAllSubs!: Subscription
  updateApproveSubs?: Subscription
  updateRejectSubs?: Subscription

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.activities$ = this.activityService.getAllActivityPending().pipe(map(result => result.data))
  }

  async onApprove(id: string): Promise<void> {
    this.updateActivityReq.id = id
    const result = await firstValueFrom(this.activityService.updateApprove(this.updateActivityReq))
    if(result) this.getAll()
  }

  async onReject(id: string): Promise<void> {
    this.updateActivityReq.id = id
    const result = await firstValueFrom(this.activityService.updateReject(this.updateActivityReq))
    if(result) this.getAll()
  }
}
