import {Component, Input, OnInit} from '@angular/core';
import {VendorDashboardServiceService} from "../../services/vendor-dashboard-service.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @Input() data: any[] | undefined;
  @Input() buttonName: any | undefined;

  constructor(public vendorDashboardService: VendorDashboardServiceService) {
  }

  ngOnInit(): void {
  }

}
