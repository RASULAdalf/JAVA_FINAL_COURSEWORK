import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor(private cookieService: CookieService) {
  }

  deleteCookie(userToken: string, s: any):Promise<any> {
    return new Promise((resolve, reject)=>{
      this.cookieService.delete(userToken, s);
      resolve(true);
    })

  }

  public setCookie(key: string, data: any):Promise<any> {
    return new Promise((resolve, reject)=>{
      this.cookieService.set(key, data, {
        //domain: 'localhost:4200/login',
        expires: 1
      });
      resolve(true);
    });
  }

  public getCookie(key: string): any {
    console.log(this.cookieService.get(key));

    return this.cookieService.get(key);
  }

}
