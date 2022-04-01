import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  constructor(private title:Title, private activityService:ActivityService) {
    title.setTitle('Activity List')
  }

  ngOnInit(): void {
  }

}
