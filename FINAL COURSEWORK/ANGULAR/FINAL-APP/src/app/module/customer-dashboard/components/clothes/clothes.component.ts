import {Component, Inject, Input, OnInit} from '@angular/core';
import {CustomerDashboardService} from "../../services/customer-dashboard.service";
import {DOCUMENT} from "@angular/common";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']

})

export class ClothesComponent implements OnInit {
  @Input() data: any[] | undefined;
  @Input() buttonName: any | undefined;


  constructor(private dashBoardService: CustomerDashboardService, @Inject(DOCUMENT) private doc: Document, private modalService: ModalService) {
  }

  ngOnInit(): void {


  }


  openModal(element: { getAttribute: (arg0: string) => any; }) {
    // @ts-ignore
    this.modalService.openItemModal(element.getAttribute("data-index"), this.data, this.buttonName);
  }
}

