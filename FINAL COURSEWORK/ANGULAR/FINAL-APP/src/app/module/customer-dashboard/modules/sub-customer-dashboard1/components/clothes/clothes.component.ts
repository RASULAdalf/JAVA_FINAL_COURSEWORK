import {Component, OnInit} from '@angular/core';
import {CustomerDashboardService} from "../../../../services/customer-dashboard.service";
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']

})

export class ClothesComponent implements OnInit {


  constructor(public customerDashboardService: CustomerDashboardService, private modalService: ModalService) {
  }

  ngOnInit(): void {


  }


  openModal(element: { getAttribute: (arg0: string) => any; }) {
    // @ts-ignore
    this.modalService.openItemModal(element.getAttribute("data-index"), this.customerDashboardService.dataList, this.customerDashboardService.buttonName);
  }
}

