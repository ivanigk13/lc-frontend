import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-activity',
  templateUrl: './order-activity.component.html',
  styleUrls: ['./order-activity.component.scss']
})
export class OrderActivityComponent implements OnInit {

  file: File

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(data: boolean): void {
    if (data) {

    }
  }

  change(event: any): void {
    this.file = event.target.files[0]
  }
}
