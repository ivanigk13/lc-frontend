import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courses: GetActivityDtoDataRes[] = []

  courseSubs?: Subscription

  constructor(private router: Router, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.courseSubs = this.activityService.getAllEvent().subscribe(result => this.courses = result.data)
  }

  onClick(id: string): void {
    this.router.navigateByUrl(`/member/order/order-activity/${id}`)
  }

  ngOnDestroy(): void {
    this.courseSubs?.unsubscribe()
  }

}
