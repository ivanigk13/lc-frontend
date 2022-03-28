import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  roles = [
    {name:'Admin', code:'A01'},
    {name:'Member', code:'M01'}
  ]

}
