import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UpdateViewOrderService} from "../../services/update-view-order.service";
import {CheckoutPageService} from "../../services/checkout-page.service";
import {HttpService} from "../../../../service/http.service";
import {environment} from "../../../../../environments/environment";
import {LoadingService} from "../../services/loading.service";
import {CustomerDashboardService} from "../../services/customer-dashboard.service";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {
  baseUrl = environment.DatabaseServerUrl;
  type: any = 'Bar';
  constructor(private snackBarService:SnackBarService,public customerDashboardService:CustomerDashboardService,public loadingService:LoadingService,private httpService:HttpService,public route:Router,public orderUpdateViewService:UpdateViewOrderService,public dialogRef: MatDialogRef<OrderModalComponent>,@Inject(MAT_DIALOG_DATA) public data: {index:any,data:any[] }) { }

  ngOnInit(): void {
  }

  viewOrder() {
    this.orderUpdateViewService.data = this.data.data[this.data.index];
    this.route.navigate(['CustomerDashboard/ViewUpdateOrder']);
  }

  deleteOrder() {
    this.httpService.delete(this.baseUrl+"order?id="+this.orderUpdateViewService.orderId).subscribe(data=>{
      console.log(data);
      // @ts-ignore
      this.customerDashboardService.dataList?.splice(this.orderUpdateViewService.orderNum,1);
      this.dialogRef.close("true");
      this.snackBarService.openSnackBar("Order deleted successfully!")
    },error => console.log(error));
  }
}
