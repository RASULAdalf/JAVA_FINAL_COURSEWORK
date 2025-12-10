import {Component, OnInit} from '@angular/core';
import {VendorDashboardServiceService} from "./services/vendor-dashboard-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../core/services/http.service";
import {SnackBarService} from "../customer-dashboard/services/snack-bar.service";
import {ModalService} from "../customer-dashboard/services/modal.service";
import {LocalDataService} from "../../core/services/local-data.service";
import {ActivatedRoute} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

import {debounceTime} from "rxjs";
import {LoadingService} from "../../core/services/loading.service";

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  searchForm = new FormGroup({
    searchText: new FormControl('', Validators.required)
  })

  chooseMenuItem: any;

  slideShowImgs: any[] = [];
  type: any = "Bar";
  totalEarnings: string = '$0.00';
  year: number = 0;
  vendorImage: string | null | undefined;
  buttonName: any;
  page: number = 0;
  pageSize: number = 5;
  pageSizeOptions = [10, 20, 30, 40];//The number of data which can be loaded inside one page
  pageEvent: PageEvent | undefined;
// }
  chooseMenuItemValue: any;
  private searchText: any;

  constructor(public route: ActivatedRoute, public localStorageService: LocalDataService, private modalService: ModalService, public snackBarService: SnackBarService, public loadingService: LoadingService, private httpService: HttpService, public vendorDashboardService: VendorDashboardServiceService) {
    this.vendorDashboardService.loginService.afAuth.currentUser.then(result => {
      this.vendorDashboardService.vendorEmail = result?.email;
    })
    this.searchForm.valueChanges.pipe(debounceTime(1080)).subscribe(data => {
      //This 1080 is a debounceTime, means that to make a request to the server only if the user has stopped typing for a second rather than making requests to the server whenever the user types something
      this.searchText = data.searchText;
      this.loadDataSearch();
    });

  }

  ngOnInit(): void {
    //this.modalService.openLetSirKnowModal("Vendor Dashboard");
    this.vendorDashboardService.vendorEmail = this.route.snapshot.queryParamMap.get('vendorEmail');
    this.vendorImage = this.route.snapshot.queryParamMap.get('vendorImage');
    this.year = new Date().getFullYear();
    this.vendorDashboardService.loadData('ORDERS', 0, 10);

  }

  logout() {
    this.vendorDashboardService.logOut();
  }


// loadDataSearch() {
//   this.dashboardService.loadSearchDataAll(this.page, this.pageSize, this.searchText, this.orderButtonClicked, this.localStorageService.getCookie('userEmail')).subscribe(data => {
//     if (!this.orderButtonClicked) {
//       this.dataList = data?.data?.items;
//     } else {
//       this.dataList = data?.data?.orders;
//     }
//     this.dataCount = data?.data?.dataCount;
//
//   }, error => console.log(error));
//
// }

  loadServerData(event: PageEvent, value: any): any {
    this.page = event?.pageIndex;
    this.pageSize = event?.pageSize;
    this.vendorDashboardService.loadData(value, this.page, this.pageSize);


  }

// openModal() {
//   this.modalService.openCartModal(this.buyingCartService.cartData.ItemList);
//   console.log(this.buyingCartService.cartData.ItemList);
// }


// loadOrdersData() {
//   this.dashboardService.loadOrderDataAll(this.page, this.pageSize, this.localStorageService.getCookie('userEmail')).subscribe(data => {
//     this.dataList = data?.data?.orders;
//     console.log(this.dataList)
//     this.dataCount = data?.data?.dataCount;
//     this.dashboardService.setDataList(this.dataList);
//   }, error => console.log(error));
//
// }
// }
//


  loadDataSearch() {
    // @ts-ignore
    this.vendorDashboardService.loadSearchDataAll(this.page, this.pageSize, this.searchText, this.vendorEmail, this.chooseMenuItemValue).subscribe(data => {
      this.vendorDashboardService.dataList = data?.data?.items;
      this.vendorDashboardService.dataCount = data?.data?.dataCount;
    }, error => console.log(error));
  }
}
