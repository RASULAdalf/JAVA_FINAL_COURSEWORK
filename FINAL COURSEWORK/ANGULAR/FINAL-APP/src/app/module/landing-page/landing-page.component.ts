import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomerDashboardGuard} from "../customer-dashboard/guards/customer-dashboard.guard";
import {LoginService} from "../../service/login.service";
import {CustomerDashboardService} from "../customer-dashboard/services/customer-dashboard.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  year: any;


  constructor(private dashboardService: CustomerDashboardService, private guard: CustomerDashboardGuard, public loginService: LoginService, @Inject(DOCUMENT) private doc: Document, private router: Router, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) {
    this.year = new Date().getFullYear();

  }


  Customerlogin(): void {
    this.loginService.loginWithAuth0();
  }

  VendorLogin() {
    this.router.navigate([this.router.url]);
    this.router.navigate(['/VendorDashboard']);
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(p => {
      this.loginService.landingPageLoginOperations(p);
    });


  }


  logoutAdmin() {

  }

  logoutCustomer() {
    this.dashboardService.logout();
  }

  logoutVendor() {
    this.loginService.SignOut();
  }

  AdminLogin() {
    this.router.navigate(['/AdminDashboard']);
  }
}
