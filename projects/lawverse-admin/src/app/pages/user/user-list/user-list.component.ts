import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  users = [
    {email: '1Joko@gmail.com', role: 'Admin'},
    {email: 'Wisnu@gmail.com', role: 'Member'},
    {email: 'Joko@gmail.com', role: 'Member'},
    { email: 'Joko@gmail.com', role: 'Admin' },
    { email: 'Wisnu@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Admin' },
    { email: 'Wisnu@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Admin' },
    { email: 'Wisnu@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Admin' },
    { email: '2Wisnu@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Admin' },
    { email: 'Wisnu@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Admin' },
    { email: 'Wisnu@gmail.com', role: 'Member' },
    { email: 'Joko@gmail.com', role: 'Member' },
  ]

}
