import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "@auth0/auth0-angular";
import {LoginService} from "../../../service/login.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private loginService: LoginService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.isLoggedAuth0().then(response => {
      console.log(response)
      console.log('can activate')
      return true;
    }).catch(err => {
      console.log('cant activate');
      this.router.navigate(['/landing']);
      return false;
    })
  }

}
