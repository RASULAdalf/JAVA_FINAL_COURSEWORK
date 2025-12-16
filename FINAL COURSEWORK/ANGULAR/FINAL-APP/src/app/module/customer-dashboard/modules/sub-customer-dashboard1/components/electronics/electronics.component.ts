import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {CustomerDashboardService} from "../../../../services/customer-dashboard.service";

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.scss']
})
export class ElectronicsComponent implements OnInit {
  constructor(private modalService: ModalService, public customerDashboardService: CustomerDashboardService) {
  }

  ngOnInit(): void {
  }

  openModal(element: { getAttribute: (arg0: string) => any; }) {
    // @ts-ignore
    this.modalService.openItemModal(element.getAttribute("data-index"), this.customerDashboardService.dataList, this.customerDashboardService.buttonName);
  }

  openReviewsModal(reviews: any, itemId: any) {
    this.modalService.openReviewModal(reviews, itemId);
  }
}
