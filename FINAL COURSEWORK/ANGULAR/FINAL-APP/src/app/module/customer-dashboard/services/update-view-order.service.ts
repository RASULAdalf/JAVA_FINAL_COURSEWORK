import { Injectable } from '@angular/core';
import {BehaviorSubject, debounceTime, Observable} from "rxjs";
import {HttpService} from "../../../service/http.service";
import {environment} from "../../../../environments/environment";
import {OrderItem} from "../../../model/OrderItem";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderBody} from "../../../model/OrderBody";
import {SnackBarService} from "./snack-bar.service";


@Injectable({
  providedIn: 'root'
})
export class UpdateViewOrderService {
  data: any;
  itemsQtyOnHand: number[] = [];
  baseUrl = environment.DatabaseServerUrl;
  QTYarray: number[] = [];
  QTYs: FormGroup[] = [];
  TotalPrice: number = 0;
  orderFormValidated: boolean= false;
  updateBtn: HTMLButtonElement | undefined;
  orderId: any;
  orderNum: number | undefined;

  constructor(private httpService: HttpService,private snackBarService:SnackBarService) {
  }

  getItemQtyOnHand(itemCode: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpService.get(this.baseUrl + "item/find?searchText=" + itemCode).subscribe(value => {
        console.log(value);
        this.itemsQtyOnHand.push(value?.data?.qtyOnHand);
        resolve(true);
      })
    })

  }

  setData(data: any) {
    let orderItem: OrderItem = {
      itemCode: data?.itemCode,
      itemDescription: data?.itemDescription,
      itemLogoUrl: data?.itemLogoUrl,
      unitPrice: data?.unitPrice,
      qty: 1,
      itemFullPrice: data?.unitPrice
    };

    this.itemsQtyOnHand.push(data?.qtyOnHand);
    this.QTYs.push(new FormGroup({
      QTYtext: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(data?.qtyOnHand)])
    }));
    this.QTYarray.push(1);
    console.log(this.QTYarray.length+" "+this.QTYs.length);
    this.data?.orders.push(orderItem);
    this.countTotalPrice();

    // console.log(this.itemsQtyOnHand);

    for (let i = 0; i < this.data.orders.length; i++) {
      this.QTYs[i].valueChanges.pipe(debounceTime(1080)).subscribe((value: { index: number; QTYtext: string; }) => {
        console.log(i +" upelement")
        //this.countTotalPrice();
        this.checkValidity().then(r => console.log(r));
        this.QTYarray.splice(i, 1, parseInt(value.QTYtext));
        console.log(this.QTYarray)
        this.countTotalPrice();

      });
    }


    this.snackBarService.openSnackBar("Item added successfully!")
  }

  countTotalPrice() {
    this.TotalPrice = 0;
    for (let i = 0; i < this.data.orders.length; i++) {
      this.TotalPrice += this.data?.orders[i]?.unitPrice * this.QTYarray[i];
    }

  }

  checkValidity():Promise<any> {
    return new Promise((resolve, reject)=>{
      for (let i = 0; i < this.QTYs.length; i++) {
        if (this.QTYs[i].invalid) {

          this.orderFormValidated = true;
          // @ts-ignore
          //this.updateBtn.disabled = true;
          resolve(true);

          break;
        }else {
          console.log("vlidted")
          this.orderFormValidated = false;

          // @ts-ignore
          // this.updateBtn.disabled = false;
          resolve(true);
        }
      }

    })

  }
  public createOrderBody(name:any,email:any,address:any,phone:any,description:any,date:any,method:any,state:any):OrderBody{
    let orderBody:OrderBody={
      customerName:name,
      customerEmail:email,
      customerAddress:address,
      customerPhoneNumber:phone,
      orderDescription:description,
      orderDate:date,
      paymentMethod:method,
      state:state
    }
    return  orderBody;
  }
}
