import { Component } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { UpdateActivityTransactionStatusDtoReq } from '../../../dto/activity/update-activity-transaction-status-dto-req';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';
import { LazyLoadEvent } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  dataPerPage = 1
  record = 0
  activities$: Observable<GetActivityDtoDataRes[]>
  activities : GetActivityDtoDataRes[] = []
  updateActivityReq : UpdateActivityTransactionStatusDtoReq = new UpdateActivityTransactionStatusDtoReq()

  constructor(private title:Title,private activityService: ActivityService) {
    title.setTitle('Pending Activity List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows)
  }

  async getData(start:number = 0, max:number = this.dataPerPage) {
    const result = await firstValueFrom(this.activityService.getAllActivityPending(start, max))
    this.activities = result.data
    this.record = result.rows
  }

  async onApprove(id: string): Promise<void> {
    this.updateActivityReq.id = id
    const result = await firstValueFrom(this.activityService.updateApprove(this.updateActivityReq))
    if(result) this.getData(0, this.dataPerPage)
  }

  async onReject(id: string): Promise<void> {
    this.updateActivityReq.id = id
    const result = await firstValueFrom(this.activityService.updateReject(this.updateActivityReq))
    if(result) this.getData(0, this.dataPerPage)
  }
}
