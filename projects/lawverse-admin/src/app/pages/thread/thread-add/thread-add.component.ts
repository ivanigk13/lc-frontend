import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread-add',
  templateUrl: './thread-add.component.html',
  styleUrls: ['./thread-add.component.scss']
})
export class ThreadAddComponent implements OnInit {

  selectedDrop: any
  pollingDetailCounter : number = 2

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.pollingDetailCounter += 1
  }

  onReduce(): void {
    this.pollingDetailCounter -= 1
  }

  createRange(num) {
    return new Array(num)
  }

  threadTypes = [
    { name: 'Reguler', id: 1 },
    { name: 'Polling', id: 2 },
    { name: 'Premium', id: 3 },
  ]
}

