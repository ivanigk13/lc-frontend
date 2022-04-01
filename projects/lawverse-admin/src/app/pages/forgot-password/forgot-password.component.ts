import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { ForgotPasswordReq } from 'src/app/dto/user/forgot-password-dto-req';
@Component({
  selector: 'app-login',
  templateUrl: './forgot-password.component.html',
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
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;

  config: AppConfig;

  subscription: Subscription;
  forgotPasswordSubs: Subscription;

  forgotPasswordReq: ForgotPasswordReq = new ForgotPasswordReq()

  constructor(public configService: ConfigService, private userService: UserService) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  onSubmit(valid: boolean): void {
    if (valid) {
      this.forgotPasswordSubs = this.userService.forgotPassowrd(this.forgotPasswordReq).subscribe(result => {
        this.forgotPasswordReq
      })
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
