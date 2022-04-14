import { CanLoad, Route, UrlSegment, UrlTree, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { LoginService } from '../service/login.service'

@Injectable({
    providedIn : 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private loginService : LoginService, private router : Router){}

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const data = this.loginService.getData()
        const token = data?.token
        if(!token){
            this.router.navigateByUrl('/login')
            return false
        }else{
            return true
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      throw new Error('Method not implemented.');
    }
}