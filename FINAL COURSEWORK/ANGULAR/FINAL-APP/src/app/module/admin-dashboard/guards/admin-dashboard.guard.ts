import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../../../service/login.service";

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardGuard implements CanActivate {
  constructor(private loginService:LoginService,private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.isLoggedAdmin().then(res=>{
      return true;
    },err=>{
      window.location.replace('https://fgggg.hub.loginradius.com/auth.aspx?action=login&return_url=http://localhost:4200/landing');
      return false;
    })
  }

}
