import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courses$: Observable<GetActivityDtoDataRes[]>

  constructor(private router: Router, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.courses$ = this.activityService.getAllCourse().pipe(map(result => result.data))
  }

  onClick(id: string): void {
    this.router.navigateByUrl(`/member/order/order-activity/${id}`)
  } 

}
