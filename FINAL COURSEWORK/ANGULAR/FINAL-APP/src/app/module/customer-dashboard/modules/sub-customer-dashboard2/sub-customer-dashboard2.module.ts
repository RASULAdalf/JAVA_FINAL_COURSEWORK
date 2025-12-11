import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubCustomerDashboard2RoutingModule} from './sub-customer-dashboard2-routing.module';
import {SubCustomerDashboard2Component} from './sub-customer-dashboard2.component';
import {CosmeticsComponent} from "./components/cosmetics/cosmetics.component";
import {OtherComponent} from "./components/other/other.component";
import {MatButtonModule} from "@angular/material/button";
import {CustomerDashboardSharedModule} from "../customer-dashboard-shared/customer-dashboard-shared.module";


@NgModule({
  declarations: [
    SubCustomerDashboard2Component,
    CosmeticsComponent,
    OtherComponent,

  ],
  exports: [
    CosmeticsComponent,
    OtherComponent
  ],
  imports: [
    CommonModule,
    SubCustomerDashboard2RoutingModule,
    MatButtonModule,
    CustomerDashboardSharedModule
  ]
})
export class SubCustomerDashboard2Module {
}
