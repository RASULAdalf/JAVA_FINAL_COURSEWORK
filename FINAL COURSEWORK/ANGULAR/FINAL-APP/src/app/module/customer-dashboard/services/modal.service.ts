import {Injectable} from '@angular/core';
import {ItemModalComponent} from "../components/item-modal/item-modal.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CartModalComponent} from "../components/cart-modal/cart-modal.component";
import {OrderModalComponent} from "../components/order-modal/order-modal.component";
import {AddItemModalComponent} from "../components/add-item-modal/add-item-modal.component";
import {EmailVerificationComponent} from "../../../core/components/email-verification/email-verification.component";
import {ReviewCustomerComponent} from "../components/review-customer/review-customer.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public orderNum: number | undefined;
  public itemdialogRef: MatDialogRef<ItemModalComponent, any> | undefined;
  public cartdialogRef: MatDialogRef<CartModalComponent, any> | undefined;
  public addItemDialogRef: MatDialogRef<AddItemModalComponent, any> | undefined;
  public emailVerificationDialogRef: MatDialogRef<EmailVerificationComponent, any> | undefined;
  public reviewCustomerDialogRef: MatDialogRef<ReviewCustomerComponent, any> | undefined;
  private orderDialogRef: MatDialogRef<OrderModalComponent, any> | undefined;

  constructor(private modalService: MatDialog) {
  }

  public openItemModal(index: any, data: any[], buttonName: any) {
    this.itemdialogRef = this.modalService.open(ItemModalComponent, {
      height: '620px',
      width: '750px',
      data: {
        index: index,
        data: data,
        buttonName: buttonName
      }
    });
  }

  public openCartModal(data: any[]) {
    this.cartdialogRef = this.modalService.open(CartModalComponent, {
      height: '620px',
      width: '1200px',
      data: {
        data: data
      }
    });
  }

  public openOrderModal(data: any[] | undefined, index: any, num: number) {
    this.orderNum = num;
    this.orderDialogRef = this.modalService.open(OrderModalComponent, {
      height: '300px',
      width: '300px',
      data: {
        index: index,
        data: data
      }
    });
  }

  public openEmailVerificationModal() {
    this.emailVerificationDialogRef = this.modalService.open(EmailVerificationComponent, {
      height: '620px',
      width: '1200px',
    });
  }

  openAddItemModal() {
    this.addItemDialogRef = this.modalService.open(AddItemModalComponent, {
      height: '900px',
      width: '1600px'
    });
  }

  public openReviewModal(data: any, itemId: any) {
    this.reviewCustomerDialogRef = this.modalService.open(ReviewCustomerComponent, {
      height: '620px',
      width: '750px',
      data: {
        data: data,
        itemId: itemId
      }
    });
  }


}
