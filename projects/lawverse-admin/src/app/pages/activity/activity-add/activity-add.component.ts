import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityAddComponent implements OnInit {

  constructor(private title:Title) {
    title.setTitle('Insert Activity')
  }

  ngOnInit(): void {
  }

  tieredItems = [
    { label: 'Customer' }
  ]

  activityTypes = [
    { label: 'Course' },
    { label: 'event' }
  ]

  categories = [
    { label: 'Hr Consultan' },
    { label: 'IT Consultan' },
    { label: 'Bootcamp Consultan' },
  ]

}
