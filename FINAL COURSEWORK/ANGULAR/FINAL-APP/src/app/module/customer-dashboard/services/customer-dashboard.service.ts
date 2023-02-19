import {Inject, Injectable} from '@angular/core';
import {LoginService} from "../../../service/login.service";
import {DOCUMENT} from "@angular/common";
import {HttpService} from "../../../service/http.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {
  baseUrl = environment.DatabaseServerUrl;
  dataList:any[] | undefined;
  constructor(private httpService:HttpService, private loginService: LoginService, @Inject(DOCUMENT) private doc: Document) {
  }

  logout() {
    this.loginService.logoutFromAuth0({returnTo: this.doc.location.origin});
  }

  loadClothesDataAll(page:any,pageSize:any):Observable<any>{
    return this.httpService.get(this.baseUrl+"item/list/category?category=Clothes&page="+page+"&pageSize="+pageSize);
  }

  loadBooksDataAll(page: number | undefined, pageSize: number | undefined):Observable<any> {
    return this.httpService.get(this.baseUrl + "item/list/category?category=Books&page=" + page + "&pageSize=" + pageSize)

  }
  loadElectronicsDataAll(page: number | undefined, pageSize: number | undefined):Observable<any> {
    return this.httpService.get(this.baseUrl + "item/list/category?category=Electronics&page=" + page + "&pageSize=" + pageSize)

  }
  loadElectricalsDataAll(page: number | undefined, pageSize: number | undefined):Observable<any> {
    return this.httpService.get(this.baseUrl + "item/list/category?category=Electrical&page=" + page + "&pageSize=" + pageSize)

  }
  loadCosmeticsDataAll(page: number | undefined, pageSize: number | undefined):Observable<any> {
    return this.httpService.get(this.baseUrl + "item/list/category?category=Cosmetics&page=" + page + "&pageSize=" + pageSize)

  }
  loadOtherDataAll(page: number | undefined, pageSize: number | undefined):Observable<any> {
    return this.httpService.get(this.baseUrl + "item/list/category?category=Other&page=" + page + "&pageSize=" + pageSize)

  }
  loadOrderDataAll(page: number | undefined, pageSize: number | undefined,email:string | undefined):Observable<any> {
    return this.httpService.get(this.baseUrl + "order/list?email=" + email + "&page=" + page + "&pageSize=" + pageSize)

  }

    loadSearchDataAll(page: number | undefined, pageSize: number | undefined, searchText: string | undefined, orderButtonClicked: boolean,email:any) {
    if (!orderButtonClicked) {
      return this.httpService.get(this.baseUrl + "item/find?searchText=" + searchText + "&page=" + page + "&pageSize=" + pageSize)
    }else {
      return this.httpService.get(this.baseUrl + "order/findCustomerOrder?email=" + email + "&searchText=" + searchText + "&page=" + page + "&pageSize=" + pageSize)
    }

  }

  setDataList(dataList: any[] | undefined){
    this.dataList = dataList;}
}
