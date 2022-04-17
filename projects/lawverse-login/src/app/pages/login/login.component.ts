import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { firstValueFrom, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { LoginDtoReq } from '../../dto/user/login-dto-req';
import { RoleList } from '../../constant/role-list';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  config: AppConfig;
  subscription: Subscription;
  roleCode: string
  loginDtoReq: LoginDtoReq = new LoginDtoReq()
  isLoading: boolean = false

  constructor(public configService: ConfigService, private title: Title, private loginService: LoginService,
    private router: Router) {
    this.title.setTitle("Login Page")
  }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  async onLogin(valid: boolean) {
    if (valid) {
      
      const resultLogin = await firstValueFrom(this.loginService.login(this.loginDtoReq))
      this.loginService.saveData(resultLogin)
      this.roleCode = resultLogin.roleCode
      if (this.roleCode == RoleList.ADMIN) {
        this.isLoading = true
        this.router.navigateByUrl('/admin/dashboard')
      }
      else if (this.roleCode == RoleList.MEMBER || this.roleCode == RoleList.PREMIUM) {
        this.isLoading = true
        this.router.navigateByUrl('/member/thread')
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
