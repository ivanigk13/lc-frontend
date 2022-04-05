import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editProfile : boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  edit() : void {
    this.editProfile = !this.editProfile
  }

  countries = []

}
