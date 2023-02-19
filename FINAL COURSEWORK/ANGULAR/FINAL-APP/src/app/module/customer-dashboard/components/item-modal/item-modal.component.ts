import {Component, Inject, OnInit} from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BuyingCartService} from "../../services/buying-cart.service";
import {Checkout_Page_Data} from "../../../../model/Checkout_Page_Data";
import {CheckoutPageService} from "../../services/checkout-page.service";
import {Router} from "@angular/router";
import {UpdateViewOrderService} from "../../services/update-view-order.service";

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {
  title: any;


  constructor(
    public dialogRef: MatDialogRef<ItemModalComponent>,private checkoutPageService:CheckoutPageService,
    private route:Router,
    public orderUpdateViewService:UpdateViewOrderService,
    @Inject(MAT_DIALOG_DATA) public data: { index:any,data:any[],buttonName:any },private buyingCartService:BuyingCartService
  ) {}

  ngOnInit(): void {
  }

  gotoSpecDoc(url:any) {
    window.open(url,'blank');
  }

  closeDialog() {
    if (this.data.buttonName!='ADD') {
      this.buyingCartService.setData(this.data.data[this.data.index]);
    }else {
      this.orderUpdateViewService.setData(this.data.data[this.data.index]);
    }
    this.dialogRef.close();
  }

  gotoBuyingPage() {
    let checkoutPageDataArray = [];
    let checkoutPageData: Checkout_Page_Data = {
        itemCode:this.data.data[this.data.index].itemCode,
        itemDescription:this.data.data[this.data.index].itemDescription,
        itemLogoUrl:this.data.data[this.data.index].itemLogoUrl,
        unitPrice:this.data.data[this.data.index].unitPrice,
        itemFullPrice:this.data.data[this.data.index].unitPrice,
        quantity:1
      };
      checkoutPageDataArray.push(checkoutPageData);

    console.log(checkoutPageDataArray);
    this.checkoutPageService.setData(checkoutPageDataArray,this.data.data[this.data.index].unitPrice);
    this.route.navigate(['CustomerDashboard/BuyingPage']);
  }
}
