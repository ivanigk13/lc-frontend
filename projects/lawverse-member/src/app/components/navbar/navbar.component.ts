import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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

  constructor(private router: Router, private profileService : ProfileService, 
    private loginService : LoginService) { }

  ngOnInit(): void {
  }

  async getProfile() : Promise<void> {
    let userId : string = this.loginService.getData().id
    const result = await firstValueFrom(this.profileService.getByUserId(userId))
    this.profile = result.data
  }

  onClick(event) : void {
      this.router.navigateByUrl(event.items.routerLink)
  }

  onLogout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
