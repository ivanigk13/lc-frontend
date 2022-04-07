import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {

  events: GetActivityDtoDataRes[] = []

  eventSubs?: Subscription

  constructor(private router : Router, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.eventSubs = this.activityService.getAllEvent().subscribe(result => this.events = result.data)
  }

  onClick(id : string) : void {
    this.router.navigateByUrl(`/member/order/order-activity/${id}`)
  }

  ngOnDestroy(): void {
    this.eventSubs?.unsubscribe()
  }

}
