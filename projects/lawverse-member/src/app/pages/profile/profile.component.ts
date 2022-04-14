import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom, map, Subscription } from 'rxjs';
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
import { UpdateSocialMediaDtoReq } from '../../dto/social-media/update-social-media-dto-req';
import { GetSocialMediaDtoDataRes } from '../../dto/social-media/get-social-media-dto-data-res';
import { SocialMediaService } from '../../service/social-media.service';
import { MenuItem } from 'primeng/api';
import { UpdateUserDtoReq } from '../../dto/user/update-user-dto-req';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit,OnDestroy {

  file? : File
  email! : string
  editProfile : boolean = true
  positionName:string= ""
  industryName:string=""
  provinceId:string=""
  countries = []
  cities : GetCityDtoDataRes[] = []
  provinces : GetProvinceDtoDataRes[] = []
  industries : GetIndustryDtoDataRes[] = []
  positions : GetPositionDtoDataRes[] = []

  items: MenuItem[];
  getByUserIdSubs? : Subscription
  updateProfileSubs? : Subscription
  getCitySubs? : Subscription
  getProvinceSubs? : Subscription
  getIndustrySubs? : Subscription
  getPositionSubs? : Subscription
  getByIdCitySubs? : Subscription
  profile : GetProfileDtoDataRes = new GetProfileDtoDataRes()
  update : UpdateProfileDtoReq = new UpdateProfileDtoReq()
  user : UpdateUserDtoReq = new UpdateUserDtoReq()
  updateSosmed : UpdateSocialMediaDtoReq = new UpdateSocialMediaDtoReq()
  sosmed : GetSocialMediaDtoDataRes = new GetSocialMediaDtoDataRes()
  activeItem: MenuItem

  constructor(private title:Title, private loginService:LoginService, private profileService:ProfileService,
              private cityService:CityService, private provinceService:ProvinceService,
              private industryService:IndustryService, private positionService:PositionService,
              private sosmedService : SocialMediaService, private userServce : UserService,
              private router : Router) {
    this.title.setTitle('My Profile')
  }

  ngOnInit(): void {
    this.getData()    
  }

  getData() : void {
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
      if(this.update.positionId){
        this.positionService.getById(this.update.positionId).subscribe(result=>{
          this.positionName = result.data.positionName
        })
      }
      if(this.update.industryId){
        this.industryService.getById(this.update.industryId).subscribe(result=>{
          this.industryName = result.data.industryName
        })
      }
      if(this.update.cityId){
        this.getByIdCitySubs = this.cityService.getById(this.update.cityId).subscribe(result=>{
          this.provinceId = result.data.provinceId
        })
      }
      if(this.update.socialMediaId){
        this.sosmedService.getById(this.update.socialMediaId).subscribe(result=>{
          this.updateSosmed = result.data
        })
      }
    })
  }

  edit() : void {
    this.editProfile = !this.editProfile
  }

  setProvince() : void {
    this.getByIdCitySubs = this.cityService.getById(this.update.cityId).subscribe(result=>{
      this.provinceId = result.data.provinceId
    })
  }

  onUpdate(){
    this.updateProfileSubs = this.profileService.update(this.update, this.file).subscribe(result=>{
      if(result){
        this.sosmedService.update(this.updateSosmed).subscribe(result=>{
          if(result) this.getData()
        })
      }
    })
  }

  async onChangePassword() : Promise<void> {    
    const userLogin = await firstValueFrom(this.userServce.getById(this.loginService.getData().id).pipe(map(result => result.data)))
    this.user.id = userLogin.id
    this.user.isActive = userLogin.isActive
    this.user.roleId = userLogin.roleId
    this.user.version = userLogin.version
    const result = await firstValueFrom(this.userServce.update(this.user))
    if (result) {
      localStorage.clear()
      this.router.navigateByUrl('/login')
    }
  }
  
  ngOnDestroy(): void {
    this.getByUserIdSubs?.unsubscribe()
    this.updateProfileSubs?.unsubscribe()
    this.getCitySubs?.unsubscribe()
    this.getProvinceSubs?.unsubscribe()
    this.getIndustrySubs?.unsubscribe()
    this.getPositionSubs?.unsubscribe()
    this.getByIdCitySubs?.unsubscribe()
  }

}
