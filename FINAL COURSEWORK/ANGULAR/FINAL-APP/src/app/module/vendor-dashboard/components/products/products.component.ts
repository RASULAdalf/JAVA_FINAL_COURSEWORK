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
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() vendorEmail: string | undefined | null;

  constructor(public vendorDashboardService: VendorDashboardServiceService, public modalService: ModalService) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  deleteProduct(itemCode: any) {
    this.vendorDashboardService.deleteProduct(itemCode, this.vendorEmail).subscribe(response => {
      this.vendorDashboardService.loadData('PRODUCTS', this.page, this.pageSize)
    }, error => {
      console.log(error);
    })
  }

  openViewModal(index: number) {
    this.modalService.openItemViewModal(this.data, index);
  }

  openEditModal(num: number) {
    if (num === -1) {
      this.modalService.openItemEditModal([{vendorEmail: this.vendorEmail}], 0, "Save");
    } else
      this.modalService.openItemEditModal(this.data, num, "Update");
  }
}
