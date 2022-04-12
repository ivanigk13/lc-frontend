import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit{

  events$: Observable<GetActivityDtoDataRes[]>  

  constructor(private router : Router, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.events$ = this.activityService.getAllEvent().pipe(map(result => result.data))
  }

  onClick(id : string) : void {
    this.router.navigateByUrl(`/member/order/order-activity/${id}`)
  }

}
