import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from 'src/app/dto/activity/get-activity-dto-data-res';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnDestroy {

  activities: GetActivityDtoDataRes[] = []
  getAllSubs!: Subscription

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.getAllSubs = this.activityService.getAll().subscribe(result => {
      this.activities = result.data
      console.log(result)
    })
  }

  ngOnDestroy(): void {
    this.getAllSubs.unsubscribe()
  }


}
