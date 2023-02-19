import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {UpdateViewOrderService} from "../../services/update-view-order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input() data: any[] | undefined;
  constructor(private modalService:ModalService,private updateViewOrderService:UpdateViewOrderService) { }

  ngOnInit(): void {

  }

  openModal(viewButton: any, num: number) {
    this.modalService.openOrderModal(this.data,viewButton.getAttribute("data-index"),num);
    // @ts-ignore
    this.updateViewOrderService.orderId = this.data[num]?.orderId;
    this.updateViewOrderService.orderNum = num;
  }
}
