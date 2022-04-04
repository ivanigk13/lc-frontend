import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from 'src/app/dto/activity/get-activity-dto-data-res';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {

  events: GetActivityDtoDataRes[] = []

  eventSubs?: Subscription

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.eventSubs = this.activityService.getAllEvent().subscribe(result => this.events = result.data)
  }

  ngOnDestroy(): void {
    this.eventSubs?.unsubscribe()
  }

}
