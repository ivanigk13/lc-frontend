import { CanLoad, Route, UrlSegment, UrlTree, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { LoginService } from '../service/login.service'
import { RoleList } from '../constant/role-list';

@Injectable({
    providedIn : 'root'
})
export class AccessGuard implements CanActivate {

    constructor(private loginService : LoginService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const data = this.loginService.getData()
      const roleCode = data.roleCode
      if(roleCode == RoleList.MEMBER || roleCode == RoleList.PREMIUM){
        this.router.navigateByUrl('/member/thread')
        return false
      }else{
        return true
      }
    }
}