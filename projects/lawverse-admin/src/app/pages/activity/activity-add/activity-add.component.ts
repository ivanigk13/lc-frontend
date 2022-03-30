import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityAddComponent implements OnInit {

  constructor() { }

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
