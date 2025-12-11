import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubCustomerDashboard1RoutingModule} from './sub-customer-dashboard1-routing.module';
import {SubCustomerDashboard1Component} from './sub-customer-dashboard1.component';
import {ElectronicsComponent} from "./components/electronics/electronics.component";
import {MatButtonModule} from "@angular/material/button";
import {ElectricalComponent} from "./components/electrical/electrical.component";
import {ClothesComponent} from "./components/clothes/clothes.component";
import {BooksComponent} from "./components/books/books.component";
import {CustomerDashboardSharedModule} from "../customer-dashboard-shared/customer-dashboard-shared.module";


@NgModule({
  declarations: [
    SubCustomerDashboard1Component,
    ElectronicsComponent,
    ElectricalComponent,
    ClothesComponent,
    BooksComponent,

  ],
  exports: [
    ClothesComponent,
    BooksComponent,
    ElectronicsComponent,
    ElectricalComponent
  ],
  imports: [
    CommonModule,
    SubCustomerDashboard1RoutingModule,
    MatButtonModule,
    CustomerDashboardSharedModule
  ]
})
export class SubCustomerDashboard1Module {
}
