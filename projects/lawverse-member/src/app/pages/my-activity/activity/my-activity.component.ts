import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.css']
})
export class MyActivityComponent implements OnInit {

  activities$: Observable<GetActivityDtoDataRes[]>

  constructor(private activityService: ActivityService, private router: Router,
    private loginService: LoginService) { }


  ngOnInit(): void {
    this.getActivity()
  }

  getActivity(): void {
    const userId = this.loginService.getData().id
    this.activities$ = this.activityService.getApprovedUserActivity(userId).pipe(map(result => result.data))
  }

  onClick(id: string): void {
    this.router.navigateByUrl(`/member/my-activity/${id}`)
  }

  onUpdate(id: string) : void {
    this.router.navigateByUrl(`/member/activity/${id}`)
  }

}
