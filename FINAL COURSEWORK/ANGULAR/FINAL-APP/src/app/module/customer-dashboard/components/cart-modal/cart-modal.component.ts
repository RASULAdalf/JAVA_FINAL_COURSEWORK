import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";
import {BuyingCartService} from "../../services/buying-cart.service";
import {CheckoutPageService} from "../../services/checkout-page.service";
import {Checkout_Page_Data} from "../../../../model/Checkout_Page_Data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  QTYs : FormGroup[] = [];
  QTYarray:number[] =  [];
  TotalPrice : number = 0;
  constructor(public route:Router,public formBuilder:FormBuilder,public dialogRef:MatDialogRef<CartModalComponent>, @Inject(MAT_DIALOG_DATA) public data:{data:any[]},private buyingCartService:BuyingCartService,private checkoutPageService:CheckoutPageService) { }

  ngOnInit(): void {
    /*for (let i = 0; i < this.data.data.length; i++) {
      //this.QTYarray.push(i);
      this.QTYs.push(this.QTYForm);
      this.QTYs[i].valueChanges.pipe(debounceTime(1080)).subscribe((value: { index: number; QTYtext: string; }) => {
        this.QTYarray.splice(value.index,1,parseInt(value.QTYtext));
      })
    }*/
    //this.countTotalPrice();
    for (let i = 0; i < this.data.data.length; i++) {
      this.QTYarray.push(1);

    }
    for (let i = 0; i < this.data.data.length; i++) {
      this.QTYs.push(new FormGroup({
        QTYtext : new FormControl('1',[Validators.required,Validators.min(1),Validators.max(this.data.data[i]?.qtyOnHand)])
      }));
      this.countTotalPrice();

      this.QTYs[i].valueChanges.pipe(debounceTime(1080)).subscribe((value: { index: number; QTYtext: string; }) => {
        //this.countTotalPrice();
        this.QTYarray.splice(i,1,parseInt(value.QTYtext));
        this.countTotalPrice();
      })
    }

    console.log(this.QTYarray);
  }


  countTotalPrice(){
    this.TotalPrice = 0;
    for (let i = 0; i < this.QTYarray.length; i++) {
      this.TotalPrice+=this.data.data[i].unitPrice*this.QTYarray[i];
    }
  }
  remove(num: number) {
    this.data.data.splice(num,1);
    this.QTYarray.splice(num,1);
    this.buyingCartService.cartData.numberOfItems-=1;
    this.countTotalPrice();
  }

  gotoBuyingPage() {
    let checkoutPageDataArray = [];
    for (let i = 0; i < this.data.data.length; i++) {
      let checkoutPageData: Checkout_Page_Data = {
          itemCode:this.data.data[i].itemCode,
          itemDescription:this.data.data[i].itemDescription,
          itemLogoUrl:this.data.data[i].itemLogoUrl,
          unitPrice:this.data.data[i].unitPrice,
          itemFullPrice:this.data.data[i].unitPrice*this.QTYarray[i],
          quantity:this.QTYarray[i]
      };
      checkoutPageDataArray.push(checkoutPageData);
    }
    console.log(checkoutPageDataArray);
    this.checkoutPageService.setData(checkoutPageDataArray,this.TotalPrice);
    this.route.navigate(['CustomerDashboard/BuyingPage']);
  }

  checkValidity():boolean {
    for (let i = 0; i < this.QTYs.length; i++) {
      if (!this.QTYs[i].invalid){
        console.log(this.QTYs[i]);
        return false;
      }
    }
    return true;
  }
}
