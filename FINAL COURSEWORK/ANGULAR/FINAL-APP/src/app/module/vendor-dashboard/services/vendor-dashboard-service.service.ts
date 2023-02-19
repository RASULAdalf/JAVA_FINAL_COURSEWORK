import {Injectable} from '@angular/core';
import {LoginService} from "../../../service/login.service";

@Injectable({
  providedIn: 'root'
})
export class VendorDashboardServiceService {
  vendorEmail:any;
  constructor(public loginService: LoginService) {
    this.loginService.afAuth.currentUser.then(res=>{
      this.vendorEmail = res?.email;
    })
  }

  public logOut() {
    this.loginService.SignOut();
  }

}
