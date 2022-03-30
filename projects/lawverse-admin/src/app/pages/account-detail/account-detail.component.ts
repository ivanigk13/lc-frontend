import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './account-detail.component.html',
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
export class AccountDetailComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;

  selectedDrop : any

  config: AppConfig;

  subscription: Subscription;

  constructor(public configService: ConfigService) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  industries = [
    { label: 'Outsorcing IT', value: { id: 1, name: 'Outsorcing IT', code: 'NY' } },
    { label: 'IT Security', value: { id: 2, name: 'Rome', code: 'RM' } },
    { label: 'Food', value: { id: 3, name: 'London', code: 'LDN' } },
    { label: 'Transportation', value: { id: 4, name: 'Istanbul', code: 'IST' } },
    { label: 'Hotel', value: { id: 5, name: 'Paris', code: 'PRS' } }
  ]

  positions = [
    { label: 'UI / UX', value: { id: 1, name: 'Outsorcing IT', code: 'NY' } },
    { label: 'Chef', value: { id: 2, name: 'Rome', code: 'RM' } },
    { label: 'Driver', value: { id: 3, name: 'London', code: 'LDN' } },
    { label: 'Bell Boy', value: { id: 4, name: 'Istanbul', code: 'IST' } },
    { label: 'Hacker', value: { id: 5, name: 'Paris', code: 'PRS' } }
  ]

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
