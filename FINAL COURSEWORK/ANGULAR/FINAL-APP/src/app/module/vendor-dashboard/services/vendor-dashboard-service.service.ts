import {Injectable} from '@angular/core';
import {LoginService} from "../../../core/services/login.service";
import {Observable} from "rxjs";
import {HttpService} from "../../../core/services/http.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VendorDashboardServiceService {
  baseUrl = environment.DatabaseServerUrl;
  baseUtilUrl = environment.UtilServerUrl;
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

  loadSearchDataAll(page: number | undefined, pageSize: number | undefined, searchText: string | undefined, email: any, type: any) {
    if (type === 'PRODUCTS') {
      return this.httpService.get(this.baseUrl + "item/find?searchText=" + searchText + "&page=" + page + "&pageSize=" + "&byWhom=vendor" + "&email=" + email)
    } else
      return null;

  }

  deleteProduct(itemCode: any, vEmail: any) {
    return this.httpService.delete(this.baseUtilUrl + "item/deleteItem?vEmail=" + vEmail + "&id=" + itemCode);
  }

  saveProduct(body: any) {
    return this.httpService.post(this.baseUtilUrl + 'item/saveItem', body);
  }

  updateProduct(vEmail: any, itemId: any, updateOption: any, body: any) {
    return this.httpService.put(this.baseUtilUrl + "item/updateItem?vEmail=" + vEmail + "&id=" + itemId + "&option=" + updateOption, body);
  }
}
