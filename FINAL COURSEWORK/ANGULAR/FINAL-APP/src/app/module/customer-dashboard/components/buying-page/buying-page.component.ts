import { Component, OnInit } from '@angular/core';
import {CheckoutPageService} from "../../services/checkout-page.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderBody} from "../../../../model/OrderBody";
import {DatePipe} from "@angular/common";
import {FinalOrderBody} from "../../../../model/FinalOrderBody";
import {OrderItem} from "../../../../model/OrderItem";
import {HttpService} from "../../../../service/http.service";
import {environment} from "../../../../../environments/environment";
import {LocalDataService} from "../../../../service/local-data.service";
import {LoadingService} from "../../services/loading.service";
import {SnackBarService} from "../../services/snack-bar.service";




@Component({
  selector: 'app-buying-page',
  templateUrl: './buying-page.component.html',
  styleUrls: ['./buying-page.component.scss']
})
export class BuyingPageComponent implements OnInit {

  paymentMethods: any[] = [{value:"Payment On Delivery"},{value: "Pay Online"}];
  Details_Form = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl(this.localDataService.getCookie('userEmail'),[Validators.required,Validators.email]),
    address:new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    description:new FormControl('',[Validators.required,Validators.maxLength(10)]),
    date:new FormControl('',Validators.required),
    //method:new FormControl('',Validators.required)

  });
  OrderBody: OrderBody | undefined;
  FinalOrderBody: FinalOrderBody | undefined;
  datePicker: any;
  method: any;
  QTYs : FormGroup[] = [];
  TotalPrice : number = 0;
  baseUrl = environment.DatabaseServerUrl;
  type: any = 'Spinner';
  constructor(private snackBarService:SnackBarService,public loadingService:LoadingService,public checkOutPageService:CheckoutPageService,private httpService:HttpService,private localDataService:LocalDataService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.checkOutPageService.CheckoutPageData.length; i++) {
      this.QTYs.push(new FormGroup({
        QTYtext: new FormControl(this.checkOutPageService.CheckoutPageData[i]?.quantity),
      }));

    }



    $('.order').click(function(e) {

      let button = $(this);


      if(!button.hasClass('animate')) {
        button.addClass('animate');
        setTimeout(() => {
          button.removeClass('animate');

        }, 6500);

      }

    });

  }

  createOrderBody() {
    this.OrderBody = this.checkOutPageService.createOrderBody(this.Details_Form.get('name')?.value,this.Details_Form.get('email')?.value,this.Details_Form.get('address')?.value,this.Details_Form.get('phone')?.value,this.Details_Form.get('description')?.value,this.Details_Form.get('date')?.value,this.method);
    console.log(this.OrderBody);
    this.snackBarService.openSnackBar("Submission was accepted ! Now you can place the order.")
  }

   public createFinalOrderBodyAndSend(){
    let orderItems:OrderItem[] = [];
    for (let i = 0; i < this.checkOutPageService.CheckoutPageData.length; i++) {
      let item:OrderItem = {
        itemCode:this.checkOutPageService.CheckoutPageData[i]?.itemCode,
        itemDescription:this.checkOutPageService.CheckoutPageData[i]?.itemDescription,
        itemLogoUrl:this.checkOutPageService.CheckoutPageData[i]?.itemLogoUrl,
        unitPrice:this.checkOutPageService.CheckoutPageData[i]?.unitPrice,
        qty:this.checkOutPageService.CheckoutPageData[i]?.quantity,
        itemFullPrice:this.checkOutPageService.CheckoutPageData[i]?.itemFullPrice
      }
      orderItems.push(item);
    }
    this.FinalOrderBody = {
      customerEmail:this.OrderBody?.customerEmail,
      customerName:this.OrderBody?.customerName,
      customerAddress:this.OrderBody?.customerAddress,
      customerPhoneNumber:this.OrderBody?.customerPhoneNumber,
      orderDate:this.OrderBody?.orderDate,
      orderDescription:this.OrderBody?.orderDescription,
      orders:orderItems,
      totalPrice:this.checkOutPageService.totalPrice,
      paymentMethod:this.OrderBody?.paymentMethod,
      state:this.OrderBody?.state

    }
    setTimeout(()=>{
      this.httpService.post(this.baseUrl+"order",this.FinalOrderBody).subscribe(data=>{
        console.log(data);
        this.snackBarService.openSnackBar("Order placed successfully!")
      },error => this.snackBarService.openSnackBar("Sorry! An error occurred !"))
    },6500);

  }



}
