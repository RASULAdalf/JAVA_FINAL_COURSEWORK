import { Component, OnInit } from '@angular/core';
import {UpdateViewOrderService} from "../../services/update-view-order.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {BehaviorSubject, debounceTime, Observable} from "rxjs";
import {OrderBody} from "../../../../model/OrderBody";
import {FinalOrderBody} from "../../../../model/FinalOrderBody";
import {OrderItem} from "../../../../model/OrderItem";
import {HttpService} from "../../../../service/http.service";
import {environment} from "../../../../../environments/environment";
import {LoadingService} from "../../services/loading.service";
import {SnackBarService} from "../../services/snack-bar.service";

// @ts-ignore
@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {
    Details_Form = new FormGroup({
    name:new FormControl(this.orderUpdateViewService.data?.customerName,Validators.required),
    email:new FormControl(this.orderUpdateViewService.data?.customerEmail,[Validators.required,Validators.email]),
    address:new FormControl(this.orderUpdateViewService.data?.customerAddress,Validators.required),
    phone:new FormControl(this.orderUpdateViewService.data?.customerPhoneNumber,Validators.required),
    description:new FormControl(this.orderUpdateViewService.data?.orderDescription,[Validators.required,Validators.maxLength(10)]),
    date:new FormControl(this.orderUpdateViewService.data?.orderDate,Validators.required),
    state:new FormControl(this.orderUpdateViewService.data?.state,Validators.required),
    method:new FormControl(this.orderUpdateViewService.data?.paymentMethod,Validators.required)

  });
  method: any = this.orderUpdateViewService.data?.paymentMethod;
  paymentMethods: any[] = [{value:"Payment On Delivery"},{value: "Pay Online"}];

  valueChanged: boolean = false;
  loaded: Promise<boolean> | undefined;
  updateBtn: HTMLButtonElement | undefined;
  OrderBody: OrderBody | undefined;
  FinalOrderBody: FinalOrderBody | undefined;
  baseUrl = environment.DatabaseServerUrl;
  type: any = 'Spinner';



  constructor(private snackBarService:SnackBarService,public loadingService:LoadingService,public orderUpdateViewService:UpdateViewOrderService,private modalService:ModalService,private httpService:HttpService) { }

  ngOnInit(): void {
    this.orderUpdateViewService.updateBtn = this.updateBtn;
    $('.order').click(function (e) {

      let button = $(this);


      if (!button.hasClass('animate')) {
        button.addClass('animate');
        setTimeout(() => {

          button.removeClass('animate');

        }, 6500);

      }

    });
    for (let i = 0; i < this.orderUpdateViewService.data?.orders.length; i++) {
      this.orderUpdateViewService.QTYarray.push(this.orderUpdateViewService.data?.orders[i]?.qty);
      this.orderUpdateViewService.getItemQtyOnHand(this.orderUpdateViewService.data?.orders[i]?.itemCode).then(result=>{
        this.loaded = Promise.resolve(true);
        this.orderUpdateViewService.QTYs.push(new FormGroup({
          QTYtext: new FormControl(this.orderUpdateViewService.data?.orders[i].qty, [Validators.required, Validators.min(1), Validators.max(this.orderUpdateViewService.itemsQtyOnHand[i])])


        }));
        this.countTotalPrice();

        console.log(this.orderUpdateViewService.itemsQtyOnHand[i]+" "+i+" "+this.orderUpdateViewService.itemsQtyOnHand)

        this.orderUpdateViewService.QTYs[i].valueChanges.pipe(debounceTime(1080)).subscribe((value: { index: number; QTYtext: string; }) => {
          this.orderUpdateViewService.checkValidity();
            this.orderUpdateViewService.QTYarray.splice(i, 1, parseInt(value.QTYtext));
            this.countTotalPrice();



        })
      });

    }

    this.Details_Form.get('method')?.setValue(this.orderUpdateViewService.data?.paymentMethod);
    this.Details_Form.valueChanges.subscribe(result => {
      this.valueChanged = true;
    })



  }




  createOrderBody() {
    this.OrderBody = this.orderUpdateViewService.createOrderBody(this.Details_Form.get('name')?.value,this.Details_Form.get('email')?.value,this.Details_Form.get('address')?.value,this.Details_Form.get('phone')?.value,this.Details_Form.get('description')?.value,this.Details_Form.get('date')?.value,this.method,this.orderUpdateViewService.data?.state);
    console.log(this.OrderBody);
    this.snackBarService.openSnackBar("Submission was accepted ! Now you can update the order.")

  }

  createFinalOrderBodyAndSend() {
    this.OrderBody = this.orderUpdateViewService.createOrderBody(this.Details_Form.get('name')?.value,this.Details_Form.get('email')?.value,this.Details_Form.get('address')?.value,this.Details_Form.get('phone')?.value,this.Details_Form.get('description')?.value,this.Details_Form.get('date')?.value,this.method,this.orderUpdateViewService.data?.state);
    let orderItems:OrderItem[] = [];
    for (let i = 0; i < this.orderUpdateViewService.data?.orders.length; i++) {
      let item:OrderItem = {
        itemCode:this.orderUpdateViewService.data?.orders[i]?.itemCode,
        itemDescription:this.orderUpdateViewService.data?.orders[i]?.itemDescription,
        itemLogoUrl:this.orderUpdateViewService.data?.orders[i]?.itemLogoUrl,
        unitPrice:this.orderUpdateViewService.data?.orders[i]?.unitPrice,
        qty:this.orderUpdateViewService.QTYs[i]?.get('QTYtext')?.value,
        itemFullPrice:(this.orderUpdateViewService.data?.orders[i]?.unitPrice*this.orderUpdateViewService.QTYs[i]?.get('QTYtext')?.value)
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
      totalPrice:this.orderUpdateViewService.TotalPrice,
      paymentMethod:this.OrderBody?.paymentMethod,
      state:this.OrderBody?.state

    }
    setTimeout(()=>{
      this.httpService.put(this.baseUrl+"order?id="+this.orderUpdateViewService.orderId,this.FinalOrderBody).subscribe(data=>{
        console.log(data);
        this.snackBarService.openSnackBar("Order updated successfully!");
      },error =>this.snackBarService.openSnackBar("Sorry! An error occurred !"))
    },1000);



}

  openModal() {
    this.modalService.openAddItemModal();
  }
  countTotalPrice(){
  this.orderUpdateViewService.TotalPrice = 0;
  for (let i = 0; i < this.orderUpdateViewService.data.orders.length; i++) {
    this.orderUpdateViewService.TotalPrice+=this.orderUpdateViewService.data?.orders[i]?.unitPrice*this.orderUpdateViewService.QTYarray[i];
  }

}





  remove(num: number) {
    console.log(num);

    this.orderUpdateViewService.data?.orders.splice(num, 1);
    this.orderUpdateViewService.QTYarray.splice(num, 1);
    console.log(this.orderUpdateViewService.QTYarray)

    this.orderUpdateViewService.QTYs.splice(num, 1);
    console.log(this.orderUpdateViewService.QTYs)

    this.orderUpdateViewService.itemsQtyOnHand.splice(num, 1);

    for (let i = 0; i < this.orderUpdateViewService.data.orders.length; i++) {
      this.orderUpdateViewService.QTYs[i].valueChanges.pipe(debounceTime(1080)).subscribe((value: { index: number; QTYtext: string; }) => {
        console.log(i)
        //this.countTotalPrice();

        this.orderUpdateViewService.QTYarray.splice(i, 1, parseInt(value.QTYtext));
        console.log(this.orderUpdateViewService.QTYarray)
        this.orderUpdateViewService.checkValidity().then(r=>{ this.orderUpdateViewService.countTotalPrice();})


      });

    }
    this.countTotalPrice();
  }
}
