import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetProfileDtoDataRes } from '../../dto/profile/get-profile-dto-data-res';
import { LoginService } from '../../service/login.service';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profile : GetProfileDtoDataRes
  profileSubs! : Subscription

  constructor(private router: Router, private profileService : ProfileService, 
    private loginService : LoginService) { }

  ngOnInit(): void {
  }

  getProfile() : void {
    let userId : string = this.loginService.getData().id
    this.profileSubs = this.profileService.getByUserId(userId).subscribe(result =>{
      this.profile = result.data
    })
  }

  onClick(event) : void {
      this.router.navigateByUrl(event.items.routerLink)
  }

  onLogout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }

  items =[
    { label: 'Activity', routerLink: '/activity/add' },
    { label: 'Login', routerLink: '/login' },    
  ]

}
