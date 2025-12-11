import {Inject, Injectable} from '@angular/core';
import {LoginService} from "../../../core/services/login.service";
import {DOCUMENT} from "@angular/common";
import {HttpService} from "../../../core/services/http.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {
  baseUrl = environment.DatabaseServerUrl;
  dataList: any[] = [];
  dataCount: any = 0;
  buttonName: any = 'ADD';

  constructor(private httpService: HttpService, private loginService: LoginService, @Inject(DOCUMENT) private doc: Document) {
  }

  logout() {
    this.loginService.logoutFromAuth0({returnTo: this.doc.location.origin});
  }

  loadClothesDataAll(page: any, pageSize: any) {
    this.httpService.get(this.baseUrl + "item/list/category?category=Clothes&page=" + page + "&pageSize=" + pageSize).subscribe(data => {
      this.dataList = data?.data?.items;
      this.dataCount = data?.data?.dataCount;
    }, error => console.log(error));
  }

  loadBooksDataAll(page: number | undefined, pageSize: number | undefined) {
    this.httpService.get(this.baseUrl + "item/list/category?category=Books&page=" + page + "&pageSize=" + pageSize).subscribe(data => {
      this.dataList = data?.data?.items;
      this.dataCount = data?.data?.dataCount;
    }, error => console.log(error));

  }

  loadElectronicsDataAll(page: number | undefined, pageSize: number | undefined) {
    this.httpService.get(this.baseUrl + "item/list/category?category=Electronics&page=" + page + "&pageSize=" + pageSize).subscribe(data => {
      this.dataList = data?.data?.items;
      this.dataCount = data?.data?.dataCount;
    }, error => console.log(error));

  }

  loadElectricalsDataAll(page: number | undefined, pageSize: number | undefined) {
    this.httpService.get(this.baseUrl + "item/list/category?category=Electrical&page=" + page + "&pageSize=" + pageSize).subscribe(data => {
      this.dataList = data?.data?.items;
      this.dataCount = data?.data?.dataCount;
    }, error => console.log(error));

  }

  loadCosmeticsDataAll(page: number | undefined, pageSize: number | undefined) {
    this.httpService.get(this.baseUrl + "item/list/category?category=Cosmetics&page=" + page + "&pageSize=" + pageSize).subscribe(data => {
      this.dataList = data?.data?.items;
      this.dataCount = data?.data?.dataCount;
    }, error => console.log(error));

  }

  loadOtherDataAll(page: number | undefined, pageSize: number | undefined) {
    this.httpService.get(this.baseUrl + "item/list/category?category=Other&page=" + page + "&pageSize=" + pageSize).subscribe(data => {
      this.dataList = data?.data?.items;
      this.dataCount = data?.data?.dataCount;
    }, error => console.log(error));

  }

  loadOrderDataAll(page: number | undefined, pageSize: number | undefined, email: string | undefined) {
    this.httpService.get(this.baseUrl + "order/listByCustomerEmail?email=" + email + "&page=" + page + "&pageSize=" + pageSize).subscribe(data => {
      this.dataList = data?.data?.orders;
      this.dataCount = data?.data?.dataCount;
    }, error => console.log(error));

  }

  loadSearchDataAll(page: number | undefined, pageSize: number | undefined, searchText: string | undefined, orderButtonClicked: boolean, email: any) {
    if (!orderButtonClicked) {
      return this.httpService.get(this.baseUrl + "item/find?searchText=" + searchText + "&page=" + page + "&pageSize=" + pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    } else {
      return this.httpService.get(this.baseUrl + "order/find?customer_email=" + email + "&searchText=" + searchText + "&page=" + page + "&pageSize=" + pageSize + "&byWhom=" + "customer").subscribe(data => {
        this.dataList = data?.data?.orders;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }

  }

  // setDataList(dataList: any[] | undefined) {
  //   this.dataList = dataList;
  // }
}
