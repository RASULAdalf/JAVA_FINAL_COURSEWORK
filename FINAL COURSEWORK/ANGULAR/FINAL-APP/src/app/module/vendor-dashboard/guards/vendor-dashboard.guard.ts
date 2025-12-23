import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {LoginService} from "../../../core/services/login.service";

@Injectable({
  providedIn: 'root'
})
export class VendorDashboardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.loginService.isLoggedAfAuth().then(response => {
    //   console.log(response)
    //   console.log('can activate')
    //   return true;
    // }).catch(() => {
    //   console.log('can\'t activate');
    //   this.router.navigate(['/VendorDashboard/login']);
    //   return false;
    // })
    return this.loginService.user$.pipe(
      map(user => {
        if (user) {
          return true;
        }
        console.log('cant activate');
        return this.router.createUrlTree(['VendorDashboard/login']);
      })
    );
  }

}
