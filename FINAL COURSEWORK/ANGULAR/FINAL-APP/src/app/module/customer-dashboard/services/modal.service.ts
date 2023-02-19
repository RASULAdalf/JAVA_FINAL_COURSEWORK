import { Injectable } from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ItemModalComponent} from "../components/item-modal/item-modal.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {CartModalComponent} from "../components/cart-modal/cart-modal.component";
import {OrderModalComponent} from "../components/order-modal/order-modal.component";
import {AddItemModalComponent} from "../components/add-item-modal/add-item-modal.component";
import {LetSirKnowComponent} from "../../../core/components/let-sir-know/let-sir-know.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public orderNum:number | undefined;
  public itemdialogRef: MatDialogRef<ItemModalComponent, any> | undefined;
  public cartdialogRef: MatDialogRef<CartModalComponent, any> | undefined;
  private orderDialogRef: MatDialogRef<OrderModalComponent, any> | undefined;
  public addItemDialogRef: MatDialogRef<AddItemModalComponent, any> | undefined;
  private letSirKnowDialogRef: MatDialogRef<LetSirKnowComponent, any> | undefined;



  constructor(private modalService: MatDialog) {}

  public openItemModal(index:any, data:any[],buttonName:any) {
     this.itemdialogRef = this.modalService.open(ItemModalComponent,{
      height: '620px',
      width: '750px',
      data:{
        index:index,
        data:data,
        buttonName:buttonName
      }
    });
  }
  public openCartModal(data:any[]) {
     this.cartdialogRef = this.modalService.open(CartModalComponent,{
      height: '620px',
      width: '1200px',
      data:{
        data:data
      }
    });
  }

  public openOrderModal(data: any[] | undefined, index: any, num: number){
    this.orderNum = num;
    this.orderDialogRef = this.modalService.open(OrderModalComponent,{
      height: '300px',
      width: '300px',
      data:{
        index:index,
        data:data
      }
    });
  }

  public openLetSirKnowModal(data: any){
    this.letSirKnowDialogRef = this.modalService.open(LetSirKnowComponent,{
      height: '620px',
      width: '1200px',
      data:{
        data:data
      }
    });
  }

  openAddItemModal() {
    this.addItemDialogRef = this.modalService.open(AddItemModalComponent,{
      height: '620px',
      width: '1600px'
    });
  }
}
