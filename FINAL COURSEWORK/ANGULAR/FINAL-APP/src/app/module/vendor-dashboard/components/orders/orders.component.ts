import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {VendorDashboardServiceService} from "../../services/vendor-dashboard-service.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['itemCode', 'itemDescription', 'qty', 'itemFullPrice', 'customerEmail', 'orderDate', 'state', 'actions'];
  category: any = '';
  categories: any[] = [{value: 'Pending Delivery'}, {value: 'Cancelled'}];

  constructor(public vendorDashboardService: VendorDashboardServiceService) {
  }

  ngOnInit(): void {
    //console.log(this.data)
  }


  orderStateChange(event: MatSelectChange, element: any) {
    console.log(this.category)
    // @ts-ignore
    element?.state = this.category;
    //Notify customer through NodeMailer

  }
}
