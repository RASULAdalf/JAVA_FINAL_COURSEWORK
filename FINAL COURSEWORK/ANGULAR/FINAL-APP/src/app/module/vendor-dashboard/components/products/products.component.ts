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
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() vendorEmail: string | undefined | null;

  constructor(public VendorDashboardService: VendorDashboardServiceService, public modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  deleteProduct(itemCode: any) {
    this.VendorDashboardService.deleteProduct(itemCode).subscribe(response => {
      this.VendorDashboardService.loadProductsDataAll(this.page, this.pageSize, this.vendorEmail);
    }, error => {
      console.log(error);
    })
  }

  openViewModal(index: number) {
    this.modalService.openItemViewModal(this.data, index);
  }

  openEditModal(num: number) {
    if (num===-1) {
      this.modalService.openItemEditModal(this.data, num, "Save");
    }else
    this.modalService.openItemEditModal(this.data, num, "Update");
  }
}
