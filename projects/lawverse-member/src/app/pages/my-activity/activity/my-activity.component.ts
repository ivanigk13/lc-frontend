import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.css']
})
export class MyActivityComponent implements OnInit, OnDestroy {

  events =[]
  activities : GetActivityDtoDataRes[] = []
  getActivitySubs!: Subscription
  constructor(private activityService: ActivityService, private router : Router, 
    private loginService : LoginService) { }


  ngOnInit(): void {
    this.getActivity()
  }

  getActivity() : void {
    const userId = this.loginService.getData().id
    this.getActivitySubs = this.activityService.getApprovedUserActivity(userId).subscribe(result => {
      this.activities = result.data 
      console.log(this.activities)
    })
  }

  onClick(id : string) : void {
    this.router.navigateByUrl(`/member/my-activity/${id}`)
  }

  ngOnDestroy(): void {
    this.getActivitySubs.unsubscribe()
  }

}
