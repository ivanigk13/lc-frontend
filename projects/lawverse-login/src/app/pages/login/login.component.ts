import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
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

  valCheck: string[] = ['remember'];

  password: string;

  config: AppConfig;

  subscription: Subscription;

  loginSubs?: Subscription
  roleCode: string
  loginDtoReq: LoginDtoReq = new LoginDtoReq()

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

  onLogin(valid: boolean) {
    if (valid) {
      this.loginSubs = this.loginService.login(this.loginDtoReq).subscribe(result => {
        this.loginService.saveData(result)
        this.roleCode = result.roleCode        
        if(this.roleCode == RoleList.ADMIN) this.router.navigateByUrl('/admin/dashboard')
        else this.router.navigateByUrl('/member/thread')
      })
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.loginSubs) {
      this.loginSubs.unsubscribe()
    }
  }
}
