import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleList } from '../../constant/role-list';
import { LoginDtoReq } from '../../dto/user/login-dto-req'
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginSubs? : Subscription
  roleCode : string
  loginDtoReq : LoginDtoReq = new LoginDtoReq()

  constructor(private title:Title, private loginService:LoginService, private router:Router) {
    this.title.setTitle("Login Page")
  }

  ngOnInit() {
  }

  onLogin(valid : boolean) {
    if(valid){
      this.loginSubs = this.loginService.login(this.loginDtoReq).subscribe(result=>{
        this.loginService.saveData(result)
        this.roleCode = result.roleCode
        if(this.roleCode == RoleList.ADMIN) this.router.navigateByUrl('/dashboard')
        else this.router.navigateByUrl('/icons')
      })
    }
  }

  ngOnDestroy() {
    this.loginSubs.unsubscribe()
  }

}
