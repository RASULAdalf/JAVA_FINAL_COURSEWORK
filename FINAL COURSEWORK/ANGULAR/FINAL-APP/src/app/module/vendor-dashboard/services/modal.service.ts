import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ItemViewModalComponent} from "../components/item-view-modal/item-view-modal.component";
import {ItemEditModalComponent} from "../components/item-edit-modal/item-edit-modal.component";
import {EmailVerificationComponent} from "../../../core/components/email-verification/email-verification.component";


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public itemViewDialogRef: MatDialogRef<ItemViewModalComponent, any> | undefined;
  public itemEditDialogRef: MatDialogRef<ItemEditModalComponent, any> | undefined;
  public emailVerificationDialogRef: MatDialogRef<EmailVerificationComponent, any> | undefined;


  constructor(private modalService: MatDialog) {
  }

  public openItemViewModal(data: any[] | undefined, index?: number) {
    this.itemViewDialogRef = this.modalService.open(ItemViewModalComponent, {
      height: '620px',
      width: '750px',
      data: {
        data: data,
        index: index
      }
    });
  }

  openItemEditModal(data: any[] | undefined, index: number, btnName: any) {
    this.itemEditDialogRef = this.modalService.open(ItemEditModalComponent, {
      height: '620px',
      width: '750px',
      data: {
        data: data,
        index: index,
        buttonName: btnName
      }
    });
  }

  public openEmailVerificationModal() {
    this.emailVerificationDialogRef = this.modalService.open(EmailVerificationComponent, {
      height: '620px',
      width: '1200px',
    });
  }
}
