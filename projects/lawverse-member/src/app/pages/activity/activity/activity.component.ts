import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activities: GetActivityDtoDataRes[] = []
  getAllSubs!: Subscription

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getAll()
  }

  async getAll(): Promise<void> {
    const result = await firstValueFrom(this.activityService.getAll())
    this.activities = result.data
  }

}
