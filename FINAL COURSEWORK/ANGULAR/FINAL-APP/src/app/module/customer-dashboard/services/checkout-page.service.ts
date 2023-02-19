import { Injectable } from '@angular/core';
import {FinalOrderBody} from "../../../model/FinalOrderBody";
import {OrderBody} from "../../../model/OrderBody";

@Injectable({
  providedIn: 'root'
})
export class CheckoutPageService {
  CheckoutPageData:any[] = []
   totalPrice:any = 0;

  constructor() { }

  public setData(data:any[],total:any){
   this.CheckoutPageData = data;
   this.totalPrice = total;
  }
  public createOrderBody(name:any,email:any,address:any,phone:any,description:any,date:any,method:any):OrderBody{
    let orderBody:OrderBody={
      customerName:name,
      customerEmail:email,
      customerAddress:address,
      customerPhoneNumber:phone,
      orderDescription:description,
      orderDate:date,
      paymentMethod:method,
      state:'Pending Delivery'
    }
    return  orderBody;
  }
}
