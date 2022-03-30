import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InsertUserDtoReq } from 'src/app/dto/user/insert-user-dto-req';
import { UserService } from 'src/app/service/user.service';
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

  constructor(public configService: ConfigService, private title:Title, private loginService:LoginService,
              private router:Router, private userService:UserService) {
    this.title.setTitle('Register Page')
  } 

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  onRegister(valid:boolean) {
    if(valid){
      this.registerSubs = this.userService.insert(this.insertUserDtoReq).subscribe()
    }
  }



  isPassSame() : void {
    if(this.cpassword == this.insertUserDtoReq.password)
      this.isSame = true
    else
      this.isSame = false
  }

  isButtonValid(valid:boolean, passSame:boolean) : boolean {
    if(!valid && this.isSame) return false
    else return true
  }

  // ngOnDestroy(): void {
 
  //     this.subscription.unsubscribe()
  
  //   this.registerSubs.unsubscribe()
  // }
  ngOnDestroy(): void {
    if (this.subscription){
    this.subscription.unsubscribe()
    }

    if(this.registerSubs){
      this.registerSubs.unsubscribe()
    }
  }
}
