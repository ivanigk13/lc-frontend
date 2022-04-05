import { Component, OnInit } from '@angular/core';
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

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.courseSubs = this.activityService.getAllCourse().subscribe(result => this.courses = result.data)
  }

  ngOnDestroy(): void {
    this.courseSubs?.unsubscribe()
  }

}
