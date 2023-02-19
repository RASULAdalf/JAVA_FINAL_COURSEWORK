import { Injectable } from '@angular/core';
import {Buying_Cart} from "../../../model/Buying_Cart";
import {SnackBarService} from "./snack-bar.service";

@Injectable({
  providedIn: 'root'
})
export class BuyingCartService {
  cartData:Buying_Cart={
    numberOfItems:0,
    ItemList:[]
  }
  constructor(private snackBarService:SnackBarService) { }

  public setData(data:any){
    this.cartData.numberOfItems+=1;
    this.cartData.ItemList.push(data);
    this.snackBarService.openSnackBar("Item added to the cart successfully!")
  }
  public removeItem(data:number){
    this.cartData.numberOfItems-=1;
    this.cartData.ItemList.slice(data,1);
  }
}
