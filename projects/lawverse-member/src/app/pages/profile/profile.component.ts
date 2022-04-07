import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, concat } from 'rxjs';
import { GetCityDtoDataRes } from '../../dto/city/get-city-dto-data-res';
import { GetIndustryDtoDataRes } from '../../dto/industry/get-industry-dto-data-res';
import { GetPositionDtoDataRes } from '../../dto/position/get-position-dto-data-res';
import { GetProvinceDtoDataRes } from '../../dto/province/get-province-dto-data-res';
import { CityService } from '../../service/city.service';
import { GetProfileDtoDataRes } from '../../dto/profile/get-profile-dto-data-res';
import { UpdateProfileDtoReq } from '../../dto/profile/update-profile-dto-req';
import { LoginService } from '../../service/login.service';
import { ProfileService } from '../../service/profile.service';
import { ProvinceService } from '../../service/province.service';
import { IndustryService } from '../../service/industry.service';
import { PositionService } from '../../service/position.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit,OnDestroy {

  email! : string
  editProfile : boolean = true
  countries = []
  cities : GetCityDtoDataRes[] = []
  provinces : GetProvinceDtoDataRes[] = []
  industries : GetIndustryDtoDataRes[] = []
  positions : GetPositionDtoDataRes[] = []

  getByUserIdSubs? : Subscription
  updateProfileSubs? : Subscription
  getCitySubs? : Subscription
  getProvinceSubs? : Subscription
  getIndustrySubs? : Subscription
  getPositionSubs? : Subscription
  profile : GetProfileDtoDataRes = new GetProfileDtoDataRes()
  update : UpdateProfileDtoReq = new UpdateProfileDtoReq()
  

  constructor(private title:Title, private loginService:LoginService, private profileService:ProfileService,
              private cityService:CityService, private provinceService:ProvinceService,
              private industryService:IndustryService, private positionService:PositionService) {
    title.setTitle('My Profile')
  }

  ngOnInit(): void {
    this.email = this.loginService.getData().email
    this.getCitySubs = this.cityService.getAll().subscribe(result=>{
      this.cities = result.data
    })
    this.getProvinceSubs = this.provinceService.getAll().subscribe(result=>{
      this.provinces = result.data
    })
    this.getIndustrySubs = this.industryService.getAll().subscribe(result=>{
      this.industries = result.data
    })
    this.getPositionSubs = this.positionService.getAll().subscribe(result=>{
      this.positions = result.data
    })
    this.getByUserIdSubs = this.profileService.getByUserId(this.loginService.getData().id).subscribe(result=>{
      this.update = result.data
    })
  }

  edit() : void {
    this.editProfile = !this.editProfile
  }

  onUpdate(){
    this.updateProfileSubs = this.profileService.update(this.update).subscribe()
  }
  
  ngOnDestroy(): void {
    this.getByUserIdSubs?.unsubscribe()
    this.updateProfileSubs?.unsubscribe()
    this.getCitySubs?.unsubscribe()
    this.getProvinceSubs?.unsubscribe()
    this.getIndustrySubs?.unsubscribe()
    this.getPositionSubs?.unsubscribe()
  }

}
