import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {LocalDataService} from "../../../../service/local-data.service";
import {AuthService} from "@auth0/auth0-angular";
import {BuyingCartService} from "../../services/buying-cart.service";
import {ModalService} from "../../services/modal.service";
import {CustomerDashboardService} from "../../services/customer-dashboard.service";
import {LoginService} from "../../../../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit {
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
  buttonName: any='ADD';


  constructor(public localStorageService:LocalDataService,public auth:AuthService,public buyingCartService:BuyingCartService,private modalService:ModalService,private dashboardService: CustomerDashboardService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  back(): void {
    this.router.navigate(['']);
  }

  ngOnInit(): void {

    this.loadData('CLOTHES');

    this.year = new Date().getFullYear();
    this.searchForm.valueChanges.pipe(debounceTime(1080)).subscribe(data=>{
      //This 1080 is a debounceTime, means that to make a request to the server only if the user has stopped typing for a second rather than making requests to the server whenever the user types something
      this.searchText = data.searchText;
      this.loadDataSearch();
    });


  }


  loadServerData(event: PageEvent, value: any, orderButtonClicked: boolean):any{
    this.page = event?.pageIndex;
    this.pageSize = event?.pageSize;
    this.loadData(value);

    }

  loadDataSearch(){
    this.dashboardService.loadSearchDataAll(this.page, this.pageSize,this.searchText,false,this.localStorageService.getCookie('userEmail')).subscribe(data => {

        this.dataList = data?.data?.items;
      this.dataCount = data?.data?.dataCount;
    }, error => console.log(error));

  }

  loadData(value:any) {
    if (value=='CLOTHES'|| value==undefined) {
      this.dashboardService.loadClothesDataAll(this.page, this.pageSize).subscribe(data => {
        this.dataList = data?.data?.items;
        this.dataCount = data?.data?.dataCount;
      }, error => console.log(error));
      console.log(this.dataList);
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






}
