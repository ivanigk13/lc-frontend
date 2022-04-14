import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { firstValueFrom, Subscription } from 'rxjs';
import { UserService } from '../../service/user.service';
import { ForgotPasswordReq } from '../../dto/user/forgot-password-dto-req';
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
  forgotPasswordReq: ForgotPasswordReq = new ForgotPasswordReq()

  constructor(public configService: ConfigService, private userService: UserService) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  async onSubmit(valid: boolean): Promise<void> {
    if (valid) {
      await firstValueFrom(this.userService.forgotPassowrd(this.forgotPasswordReq))
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
