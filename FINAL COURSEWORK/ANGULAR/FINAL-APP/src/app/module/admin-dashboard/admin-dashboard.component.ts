import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ModalService} from "../customer-dashboard/services/modal.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private modalService:ModalService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.modalService.openLetSirKnowModal('Admin Dashboard');
  }

  AdminLogout() {
    this.loginService.AdminLogout();
  }
}
