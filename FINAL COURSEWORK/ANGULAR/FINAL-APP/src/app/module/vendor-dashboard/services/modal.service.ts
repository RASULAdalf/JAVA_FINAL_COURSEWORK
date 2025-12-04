import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ItemViewModalComponent} from "../components/item-view-modal/item-view-modal.component";
import {ItemModalComponent} from "../../customer-dashboard/components/item-modal/item-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public itemViewDialogRef: MatDialogRef<ItemModalComponent, any> | undefined;
  constructor(private modalService:MatDialog) { }

  public openItemViewModal(data: any[] | undefined, index?: number) {
    this.itemViewDialogRef =  this.modalService.open(ItemModalComponent, {
      height: '620px',
      width: '750px',
      data: {
        data: data,
        index:index
      }
    });
  }
}
