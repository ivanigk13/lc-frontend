import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { firstValueFrom, Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InsertUserDtoReq } from 'src/app/dto/user/insert-user-dto-req';
import { UserService } from 'src/app/service/user.service';
import { LoginDtoReq } from 'src/app/dto/user/login-dto-req';
@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
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
export class RegisterComponent implements OnInit,OnDestroy {

  valCheck: string[] = ['remember']
  
  config: AppConfig
  
  subscription: Subscription
  
  registerSubs? : Subscription
  cpassword: string
  isSame: boolean = false
  insertUserDtoReq : InsertUserDtoReq = new InsertUserDtoReq()

  loginDtoReq : LoginDtoReq = new LoginDtoReq()

  verifCode! : string
  insertVerifCode : string = ""
  isCodeSame : boolean = false

  constructor(public configService: ConfigService, private title:Title, private router:Router,
              private userService:UserService, private loginService:LoginService) {
    this.title.setTitle('Register Page')
  } 

  ngOnInit(): void {
    this.initConfig()
  }

  initConfig() {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  isPassSame() : void {
    if(this.cpassword == this.insertUserDtoReq.password)
      this.isSame = true
    else
      this.isSame = false
  }

  isButtonValid(valid:boolean, passSame:boolean) : boolean {
    if(!valid && passSame) return false
    else return true
  }

  async getVerifCode() {
    const result = await firstValueFrom(this.userService.getVerificationCode(this.insertUserDtoReq.email))
    this.verifCode = result.verificationCode
  }

  checkIsCodeSame() : void {
    if(this.verifCode == this.insertVerifCode) this.isCodeSame = true
    else this.isCodeSame = false
  }

  async onRegister(valid:boolean) {
    if(valid){
      const resultRegister = await firstValueFrom(this.userService.insert(this.insertUserDtoReq))
      if(resultRegister){
        this.loginDtoReq = new LoginDtoReq()
        this.loginDtoReq.email = this.insertUserDtoReq.email
        this.loginDtoReq.password = this.insertUserDtoReq.password
        
        const resultLogin = await firstValueFrom(this.loginService.login(this.loginDtoReq))
        if(resultLogin){
          this.loginService.saveData(resultLogin)
          this.router.navigateByUrl('/account-detail')
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe()
    }
  }
}
