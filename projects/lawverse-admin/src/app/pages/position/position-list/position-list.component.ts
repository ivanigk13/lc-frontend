import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  positions = [
    { name: 'Leader', code: 'LDR' },
    { name: 'Vice Leader', code: 'VLDR' },
    { name: 'Sub Leader', code: 'SLDR' },
  ]
}
