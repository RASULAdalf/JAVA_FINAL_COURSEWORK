import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ItemModalComponent} from "../../../customer-dashboard/components/item-modal/item-modal.component";

@Component({
  selector: 'app-item-view-modal',
  templateUrl: './item-view-modal.component.html',
  styleUrls: ['./item-view-modal.component.scss']
})
export class ItemViewModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    index: any,
    data: any[],
    },private router: Router,
              public dialogRef: MatDialogRef<ItemModalComponent>) { }

  ngOnInit(): void {
  }

  gotoSpecDoc(url: any) {
    window.open(url, 'blank');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
