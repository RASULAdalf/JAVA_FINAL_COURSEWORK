import {Injectable} from '@angular/core';
import {LoginService} from "../../../core/services/login.service";
import {Observable} from "rxjs";
import {HttpService} from "../../../core/services/http.service";
import {environment} from "../../../../environments/environment";
import {Auth} from "@angular/fire/auth";
import {Database, ref, set} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class VendorDashboardServiceService {
  baseUrl = environment.DatabaseServerUrl;
  baseUtilUrl = environment.UtilServerUrl;
  vendorEmail: any;
  dataList: any[] = [];
  dataCount: number = 0;
  totalEarnings: any = 0.00;

  constructor(public httpService: HttpService, public loginService: LoginService, private auth: Auth, private db: Database) {
    this.loginService.afAuth.currentUser.then(res => {
      this.vendorEmail = res?.email;
    })
  }

  public async logOut() {
    const uid = this.auth.currentUser?.uid;

    if (uid) {
      const userStatusRef = ref(this.db, `vendor_login/status/${uid}`);

      // Mark user offline BEFORE signOut
      await set(userStatusRef, {
        state: "offline",
        last_changed: Date.now()
      });
    }
    this.loginService.SignOut();
  }

  loadProductsDataAll(page: any, pageSize: any, vendor_email: any): Observable<any> {
    this.dataList = [];
    return this.httpService.get(this.baseUrl + "item/find?searchText=" + vendor_email + "&page=" + page + "&pageSize=" + pageSize);
  }

  loadClientsDataAll(page: number | undefined, pageSize: number | undefined, email_list: any): Observable<any> {
    this.dataList = [];
    return this.httpService.get(this.baseUtilUrl + "vendor/getClients?email_list=" + email_list);

  }

  loadEarningsDataAll(page: number | undefined, pageSize: number | undefined): Observable<any> {
    this.dataList = [];
    return this.httpService.get(this.baseUrl + "order/listByVendorEmail?email=" + this.vendorEmail + "&page=" + page + "&pageSize=" + pageSize)

  }

  loadAnalysisDataAll(page: number | undefined, pageSize: number | undefined): Observable<any> {
    this.dataList = [];
    return this.httpService.get(this.baseUrl + "item/list/category?category=Electrical&page=" + page + "&pageSize=" + pageSize)

  }

  loadOrdersDataAll(page: number | undefined, pageSize: number | undefined, email: string | undefined | null): Observable<any> {
    this.dataList = [];
    return this.httpService.get(this.baseUrl + "order/listByVendorEmail?email=" + email + "&page=" + page + "&pageSize=" + pageSize)

  }

  loadSearchDataAll(page: number | undefined, pageSize: number | undefined, searchText: string | undefined, type: any) {
    this.dataList = [];
    if (type === 'PRODUCTS') {
      this.httpService.get(this.baseUrl + "item/find?searchText=" + searchText + "&page=" + page + "&pageSize=" + pageSize + "&byWhom=vendor" + "&email=" + this.vendorEmail).subscribe(result => {
        this.dataList = result?.data?.items;
        this.dataCount = result?.data?.dataCount;
      }, error => {
        console.log(error)
      })
    } else if (type === 'ORDERS') {
      this.httpService.get(this.baseUrl + "order/find?searchText=" + searchText + "&page=" + page + "&pageSize=" + pageSize + "&byWhom=vendor" + "&vendor_email=" + this.vendorEmail).subscribe(result => {
        this.dataList = result?.data?.orders;
        this.dataCount = result?.data?.dataCount;
      }, error => {
        console.log(error)
      })
    }

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

  loadData(value: any, page: number, pageSize: number) {

    if (value == 'ORDERS' || value == undefined) {
      this.loadOrdersDataAll(page, pageSize, this.vendorEmail).subscribe(data => {
        this.dataList = data?.data?.orders;
        this.dataCount = data?.data?.dataCount;
        this.calculateTotalEarnings()
      }, error => console.log(error));
    } else if (value == 'PRODUCTS') {
      this.loadProductsDataAll(page, pageSize, this.vendorEmail).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;

      }, error => console.log(error));
    } else if (value == 'CLIENTS') {
      this.loadOrdersDataAll(page, pageSize, this.vendorEmail).subscribe(data => {
        this.dataList = data?.data?.orders;
        this.dataCount = data?.data?.dataCount;
        let list: any;
        for (let data of this.dataList) {
          if (list == undefined) {
            list = data?.customerEmail
          }
          if (list != undefined) {
            if (!list.includes(data?.customerEmail))
              list += data?.customerEmail + ','
          }
        }
        if (list != undefined) {
          let modifiedFinalList = list.replace(/,$/, '');
          console.log(modifiedFinalList)
          this.loadClientsDataAll(page, pageSize, modifiedFinalList).subscribe(data => {
            this.dataList = data?.data;
            this.dataCount = data?.dataCount;
            console.log(this.dataList)

          }, error => console.log(error));
        }

      }, error => console.log(error));


    } else if (value == 'EARNINGS') {
      this.loadEarningsDataAll(page, pageSize).subscribe(data => {
        this.dataList = data?.data?.orders;
        this.dataCount = data?.data?.dataCount;
        this.calculateTotalEarnings()
      }, error => console.log(error));
    } else if (value == 'ANALYSIS') {
      this.loadAnalysisDataAll(page, pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }

  }

  private calculateTotalEarnings() {
    this.totalEarnings = 0.00;
    for (let data of this.dataList) {
      this.totalEarnings += data?.itemFullPrice;
    }
  }

}
