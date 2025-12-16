import {Component, Input, OnInit} from '@angular/core';
import {VendorDashboardServiceService} from "../../services/vendor-dashboard-service.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() data: any[] | undefined;
  @Input() displayType: any = 'product'

  constructor(public vendorDashboardService: VendorDashboardServiceService, public modalService: ModalService) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  deleteProduct(itemCode: any) {
    this.vendorDashboardService.deleteProduct(itemCode, this.vendorDashboardService.vendorEmail).subscribe(response => {
      this.vendorDashboardService.loadData('PRODUCTS', 0, 10)
    }, error => {
      console.log(error);
    })
  }

  openViewModal(index: number) {
    this.modalService.openItemViewModal(this.vendorDashboardService.dataList, index);
  }

  openEditModal(num: number) {
    if (num === -1) {
      this.modalService.openItemEditModal([{vendorEmail: this.vendorDashboardService.vendorEmail}], 0, "Save");
    } else
      this.modalService.openItemEditModal(this.vendorDashboardService.dataList, num, "Update");
  }
}
