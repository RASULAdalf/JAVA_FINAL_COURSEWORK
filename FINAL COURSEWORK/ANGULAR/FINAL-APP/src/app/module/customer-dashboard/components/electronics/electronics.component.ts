import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.scss']
})
export class ElectronicsComponent implements OnInit {
  @Input() data: any[] | undefined;
  @Input() buttonName:any | undefined;
  constructor(private modalService:ModalService) { }

  ngOnInit(): void {
  }
  openModal(element: { getAttribute: (arg0: string) => any; }) {
    // @ts-ignore
    this.modalService.openItemModal(element.getAttribute("data-index"),this.data,this.buttonName);
  }
}
