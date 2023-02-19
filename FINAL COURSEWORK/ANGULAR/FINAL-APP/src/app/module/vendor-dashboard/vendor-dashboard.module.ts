import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VendorDashboardRoutingModule} from './vendor-dashboard-routing.module';
import {VendorDashboardComponent} from './vendor-dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {MatTabsModule} from "@angular/material/tabs";
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CustomerDashboardModule} from "../customer-dashboard/customer-dashboard.module";


@NgModule({
  declarations: [
    VendorDashboardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    VendorDashboardRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    CustomerDashboardModule,
  ]
})
export class VendorDashboardModule {
}
