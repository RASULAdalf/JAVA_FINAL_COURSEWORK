import {Injectable} from '@angular/core';
import {LoginService} from "../../../service/login.service";
import {Observable} from "rxjs";
import {HttpService} from "../../../service/http.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VendorDashboardServiceService {
  baseUrl = environment.DatabaseServerUrl;
  vendorEmail: any;

  constructor(public httpService: HttpService, public loginService: LoginService) {
    this.loginService.afAuth.currentUser.then(res => {
      this.vendorEmail = res?.email;
    })
  }

  public logOut() {
    this.loginService.SignOut();
  }

  loadProductsDataAll(page: any, pageSize: any, vendor_email: any): Observable<any> {
    return this.httpService.get(this.baseUrl + "item/find?searchText=" + vendor_email + "&page=" + page + "&pageSize=" + pageSize);
  }

  loadClientsDataAll(page: number | undefined, pageSize: number | undefined): Observable<any> {
    return this.httpService.get(this.baseUrl + "item/list/category?category=Books&page=" + page + "&pageSize=" + pageSize)

  }

  loadEarningsDataAll(page: number | undefined, pageSize: number | undefined): Observable<any> {
    return this.httpService.get(this.baseUrl + "item/list/category?category=Electronics&page=" + page + "&pageSize=" + pageSize)

  }

  loadAnalysisDataAll(page: number | undefined, pageSize: number | undefined): Observable<any> {
    return this.httpService.get(this.baseUrl + "item/list/category?category=Electrical&page=" + page + "&pageSize=" + pageSize)

  }

  loadOrdersDataAll(page: number | undefined, pageSize: number | undefined, email: string | undefined | null): Observable<any> {
    return this.httpService.get(this.baseUrl + "order/listByVendorEmail?email=" + email + "&page=" + page + "&pageSize=" + pageSize)

  }

  loadSearchDataAll(page: number | undefined, pageSize: number | undefined, searchText: string | undefined, email: any,type:any) {
    if (type==='PRODUCTS') {
      return this.httpService.get(this.baseUrl + "item/find?searchText=" + searchText + "&page=" + page + "&pageSize=" + "&byWhom=vendor" + "&email=" + email)
    }
    else
      return null;

  }

  deleteProduct(itemCode: any) {
    return this.httpService.delete(this.baseUrl + "item?id=" + itemCode);
  }
}
