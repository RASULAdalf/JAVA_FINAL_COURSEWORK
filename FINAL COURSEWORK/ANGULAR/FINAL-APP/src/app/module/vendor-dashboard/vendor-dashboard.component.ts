import {Component, OnInit} from '@angular/core';
import {VendorDashboardServiceService} from "./services/vendor-dashboard-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../service/http.service";
import {environment} from "../../../environments/environment";
import {SnackBarService} from "../customer-dashboard/services/snack-bar.service";
import {ModalService} from "../customer-dashboard/services/modal.service";
import {LocalDataService} from "../../service/local-data.service";
import {ActivatedRoute} from "@angular/router";
import {debounceTime} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {LoadingService} from "./services/loading.service";

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  vendorEmail: string | undefined | null;

  addNewItemsForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    qty: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    imgSource: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    //slideShowImgsSource:new FormControl('',Validators.required),
    slideShowImgs: new FormControl('', Validators.required),
    specsDocSource: new FormControl('', Validators.required),
    specsDoc: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    vEmail: new FormControl(this.dashboardService.vendorEmail, Validators.required)
  })
  category: any;
  categories: any[] = [{value: 'Books'}, {value: 'Clothes'}, {value: 'Electronics'}, {value: 'Electrical'}, {value: 'Cosmetics'}, {value: 'Other'}];
  slideShowImgs: any[] = [];
  baseDatabaseServerUrl = environment.DatabaseServerUrl;
  baseUtilServerUrl = environment.UtilServerUrl;
  formData = new FormData();

  onImg: boolean = true;
  onSlide: boolean = true;
  onSpec: boolean = true;
  type: any = "Bar";
  totalEarnings: string = '$0.00';
  year: number = 0;
  vendorImage: string | null | undefined;
  dataList: any[] | undefined;
  buttonName: any;
   page: number = 0;
   pageSize: number = 5;
   dataCount: number = 0;
  pageSizeOptions = [10, 20, 30, 40];//The number of data which can be loaded inside one page
  pageEvent: PageEvent | undefined;


  constructor(public route: ActivatedRoute, public localStorageService: LocalDataService, private modalService: ModalService, public snackBarService: SnackBarService, public loadingService: LoadingService, private httpService: HttpService, private dashboardService: VendorDashboardServiceService) {
    this.dashboardService.loginService.afAuth.currentUser.then(result => {
      this.vendorEmail = result?.email;
    })

  }


  onImgChange($event: Event) {
    this.onImg = false;
    // @ts-ignore
    if (event.target.files.length > 0) {

      // @ts-ignore
      const file = event.target.files[0];

      this.addNewItemsForm.patchValue({

        imgSource: file

      });

    }
  }

  onSpecsDocChange($event: Event) {
    this.onSpec = false;
    // @ts-ignore
    if (event.target.files.length > 0) {

      // @ts-ignore
      const file = event.target.files[0];

      this.addNewItemsForm.patchValue({

        specsDocSource: file

      });

    }
  }

  onSlideImgsChange($event: Event) {
    this.onSlide = false;
    // @ts-ignore
    for (const file of event.target.files) {
      this.formData.append("slideShowImgs", file);
    }
  }

  submit() {


    this.formData.append('specsDoc', this.addNewItemsForm.get('specsDocSource')?.value);
    this.formData.append('itemDescription', this.addNewItemsForm.get('description')?.value)
    this.formData.append('itemCategory', this.category)
    this.formData.append('showImg', this.addNewItemsForm.get('imgSource')?.value);
    this.formData.append('unitPrice', this.addNewItemsForm.get('price')?.value)
    this.formData.append('qty', this.addNewItemsForm.get('qty')?.value)
    this.formData.append('vendorEmail', this.addNewItemsForm.get('vEmail')?.value)


    this.httpService.post(this.baseUtilServerUrl + 'Item/saveItem', this.formData)

      .subscribe(res => {

        this.snackBarService.openSnackBar(res?.message);

      })

  }

  ngOnInit(): void {
    //this.modalService.openLetSirKnowModal("Vendor Dashboard");
    this.vendorEmail = this.route.snapshot.queryParamMap.get('vendorEmail');
    this.vendorImage = this.route.snapshot.queryParamMap.get('vendorImage');
    this.year = new Date().getFullYear();
    this.loadData('ORDERS');

  }

  logout() {
    this.dashboardService.logOut();
  }


  loadServerData(event: PageEvent, value: any):any{
    this.page = event?.pageIndex;
    this.pageSize = event?.pageSize;
    this.loadData(value);


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

  loadData(value: any) {

    if (value == 'ORDERS' || value == undefined) {
      this.dashboardService.loadOrdersDataAll(this.page, this.pageSize, this.vendorEmail).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }else if (value == 'PRODUCTS') {
      this.dashboardService.loadProductsDataAll(this.page, this.pageSize, this.vendorEmail).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    } else if (value == 'CLIENTS') {
      this.dashboardService.loadClientsDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    } else if (value == 'EARNINGS') {
      this.dashboardService.loadEarningsDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    } else if (value == 'ANALYSIS') {
      this.dashboardService.loadAnalysisDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }

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
// }

}
