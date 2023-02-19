import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from "../../../service/login.service";

@Injectable({
  providedIn: 'root'
})
export class VendorDashboardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.isLoggedFirebase().then(response => {
      console.log(response)
      console.log('can activate')
      return true;
    }).catch(err => {
      console.log('cant activate');
      this.router.navigate(['/VendorDashboard/login']);
      return false;
    })
  }

}
