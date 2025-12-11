import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {CustomerDashboardService} from "../../../../services/customer-dashboard.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private modalService: ModalService, public customerDashboardService: CustomerDashboardService) {
  }

  ngOnInit(): void {
  }

  openModal(element: { getAttribute: (arg0: string) => any; }) {

    // @ts-ignore
    this.modalService.openItemModal(element.getAttribute("data-index"), this.customerDashboardService.dataList, this.customerDashboardService.buttonName);
  }
}
