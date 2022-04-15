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

export class ProfileComponent implements OnInit {

  file? : File
  email! : string
  editProfile : boolean = true
  isSame : boolean = false
  positionName:string= ""
  industryName:string=""
  provinceId:string=""
  countries = []
  cities : GetCityDtoDataRes[] = []
  provinces : GetProvinceDtoDataRes[] = []
  industries : GetIndustryDtoDataRes[] = []
  positions : GetPositionDtoDataRes[] = []  

  items: MenuItem[];
  city : string
  province : string

  profile : GetProfileDtoDataRes 
  update : UpdateProfileDtoReq = new UpdateProfileDtoReq()
  user : UpdateUserDtoReq = new UpdateUserDtoReq()
  updateSosmed : UpdateSocialMediaDtoReq = new UpdateSocialMediaDtoReq()
  sosmed : GetSocialMediaDtoDataRes = new GetSocialMediaDtoDataRes()  
  cPassword : string

  constructor(private title:Title, private loginService:LoginService, private profileService:ProfileService,
              private cityService:CityService, private provinceService:ProvinceService,
              private industryService:IndustryService, private positionService:PositionService,
              private sosmedService : SocialMediaService, private userServce : UserService,
              private router : Router) {
    this.title.setTitle('My Profile')
  }

  ngOnInit(): void {
    this.getProfile()
    this.getData()    
  }

  async getData() : Promise<void> {
    this.email = this.loginService.getData().email
    this.cities = await firstValueFrom(this.cityService.getAll().pipe(map(result => result.data)))
    this.provinces = await firstValueFrom(this.provinceService.getAll().pipe(map(result => result.data)))
    this.industries = await firstValueFrom(this.industryService.getAll().pipe(map(result => result.data)))
    this.positions = await firstValueFrom(this.positionService.getAll().pipe(map(result => result.data)))
    this.update = await firstValueFrom(this.profileService.getByUserId(this.loginService.getData().id).pipe(map(result => result.data)))
    
    if(this.update.positionId){
      this.positionName = await firstValueFrom(this.positionService.getById(this.update.positionId).pipe(map(result => result.data.positionName)))
    }
    if(this.update.industryId){
      this.industryName = await firstValueFrom(this.industryService.getById(this.update.industryId).pipe(map(result => result.data.industryName)))
    }
    if(this.update.cityId){
      this.provinceId = await firstValueFrom(this.cityService.getById(this.update.cityId).pipe(map(result => result.data.provinceId)))
    }
    if(this.update.socialMediaId){
      this.updateSosmed = await firstValueFrom(this.sosmedService.getById(this.update.socialMediaId).pipe(map(result => result.data)))
    }
  }

  async getProfile() : Promise<void>{
    const userId = this.loginService.getData().id
    this.profile = await firstValueFrom(this.profileService.getByUserId(userId).pipe(map(result => result.data)))
    if(this.profile){
      const cityData = await firstValueFrom(this.cityService.getById(this.profile.cityId).pipe(map(result => result.data)))
      if(this.city) {
        this.city = cityData.cityName
        this.province = await firstValueFrom(this.provinceService.getById(cityData.provinceId).pipe(map(result => result.data.provinceName)))
      }
    } 
  }

  changeFile(event : any): void {
    this.file = event.target.files[0]
  }

  isPasswordSame() : void {
    if(this.cPassword == this.user.password && this.cPassword.length>0)
      this.isSame = true
    else 
      this.isSame = false
  }

  async setProvince() : Promise<void> {
    this.provinceId = await firstValueFrom(this.cityService.getById(this.update.cityId).pipe(map(result=>result.data.provinceId)))
  }

  async onUpdate(){
    const result = await firstValueFrom(this.profileService.update(this.update, this.file))
    if(result){
      const resultSosmed = await firstValueFrom(this.sosmedService.update(this.updateSosmed))
      if(resultSosmed) {
        this.getData() 
        this.getProfile()
      } 
    }
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

}
