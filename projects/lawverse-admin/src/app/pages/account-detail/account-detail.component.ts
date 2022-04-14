import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { firstValueFrom, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IndustryService } from '../../service/industry.service';
import { GetIndustryDtoDataRes } from '../../dto/industry/get-industry-dto-data-res'
import { GetPositionDtoDataRes } from 'src/app/dto/position/get-position-dto-data-res';
import { PositionService } from 'src/app/service/position.service';
import { ProfileService } from 'src/app/service/profile.service';
import { InsertProfileDtoReq } from 'src/app/dto/profile/insert-profile-dto-req';

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

  config: AppConfig;

  subscription: Subscription;

  industries : GetIndustryDtoDataRes[] = []
  positions : GetPositionDtoDataRes[] = []
  insertProfileDtoReq : InsertProfileDtoReq = new InsertProfileDtoReq()

  constructor(public configService: ConfigService, private title:Title, private router:Router,
              private industryService:IndustryService, private positionService:PositionService,
              private profileService:ProfileService) {
    title.setTitle('Account Detail')
  }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  async getMasterData() {
    const resultIndustry = await firstValueFrom(this.industryService.getAll())
    this.industries = resultIndustry.data

    const resultPosition = await firstValueFrom(this.positionService.getAll())
    this.positions = resultPosition.data
  }

  async insert(valid:boolean) : Promise<void> {
    if(valid){
      await firstValueFrom(this.profileService.insert(this.insertProfileDtoReq))
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
