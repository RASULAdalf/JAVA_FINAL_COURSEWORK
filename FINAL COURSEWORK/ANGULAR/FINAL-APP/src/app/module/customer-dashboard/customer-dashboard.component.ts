import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerDashboardService} from "./services/customer-dashboard.service";
import {PageEvent} from "@angular/material/paginator";
import {ClothesComponent} from "./components/clothes/clothes.component";
import {debounceTime, Observable} from "rxjs";
import {ModalService} from "./services/modal.service";
import {BuyingCartService} from "./services/buying-cart.service";
import {AuthService} from "@auth0/auth0-angular";
import {LocalDataService} from "../../service/local-data.service";
import {LoadingService} from "./services/loading.service";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']

})
export class CustomerDashboardComponent implements OnInit {
  year: any;
  searchForm = new FormGroup({
    searchText : new FormControl('',Validators.required)
  })
  page:number | undefined=0;
  pageSize:number | undefined=6;
  pageSizeOptions=[10,20,30,40];//The number of data which can be loaded inside one page
  pageEvent:PageEvent | undefined;
  dataCount=0;
  dataList:any[] | undefined;
  private searchText: any;
  cartItemsListNumber: any=0;
  orderButtonClicked: boolean = false;
  buttonName: any='Add To Cart';
  type: any = "Bar";


  constructor(public loadingService:LoadingService,public localStorageService:LocalDataService,public auth:AuthService,public buyingCartService:BuyingCartService,private modalService:ModalService,private dashboardService: CustomerDashboardService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  back(): void {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(p => {
      this.loginService.CustomerDashboardLoginOperations(p);

    })

    this.loadData('CLOTHES');

    this.year = new Date().getFullYear();
    this.searchForm.valueChanges.pipe(debounceTime(1080)).subscribe(data=>{
      //This 1080 is a debounceTime, means that to make a request to the server only if the user has stopped typing for a second rather than making requests to the server whenever the user types something
      this.searchText = data.searchText;
      this.loadDataSearch();
    });
    this.modalService.itemdialogRef?.afterClosed().subscribe(res=>{
      console.log(res);
    });

  }

  logout() {
    this.dashboardService.logout();
    //this.localStorageService.deleteCookie('auth0.QXJHgOuSHAtRI6kh8vcucynqYHOHUyRQ.is.authenticated',true);
    this.router.navigate(['']);
  }

  loadServerData(event: PageEvent, value: any, orderButtonClicked: boolean):any{
    this.page = event?.pageIndex;
    this.pageSize = event?.pageSize;
    if (!orderButtonClicked) {
      this.loadData(value);
    }else {
      this.loadOrdersData();
    }


  }



  loadDataSearch(){
    this.dashboardService.loadSearchDataAll(this.page, this.pageSize,this.searchText,this.orderButtonClicked,this.localStorageService.getCookie('userEmail')).subscribe(data => {
      if (!this.orderButtonClicked) {
        this.dataList = data?.data?.items;
      }else {
        this.dataList = data?.data?.orders;
      }
      this.dataCount = data?.data?.dataCount;

    }, error => console.log(error));

  }

  loadData(value:any) {
    this.orderButtonClicked = false;
    if (value=='CLOTHES'|| value==undefined) {
      this.dashboardService.loadClothesDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }

      else if (value=='BOOKS') {
      this.dashboardService.loadBooksDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }

  else if (value=='ELECTRONICS') {
      this.dashboardService.loadElectronicsDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }

  else if (value=='ELECTRICAL') {
      this.dashboardService.loadElectricalsDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }

  else if (value=='COSMETICS') {
      this.dashboardService.loadCosmeticsDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }

  else if (value=='OTHER') {
      this.dashboardService.loadOtherDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
    }

  }

  openModal() {
    this.modalService.openCartModal(this.buyingCartService.cartData.ItemList);
    console.log(this.buyingCartService.cartData.ItemList);
  }


  loadOrdersData() {
    this.orderButtonClicked = true;
    this.dashboardService.loadOrderDataAll(this.page,this.pageSize,this.localStorageService.getCookie('userEmail')).subscribe(data=>{
      this.dataList = data?.data?.orders;
      console.log(this.dataList)
      this.dataCount = data?.data?.dataCount;
      this.dashboardService.setDataList(this.dataList);
    },error => console.log(error));

  }
}
