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
import {MatSelectModule} from "@angular/material/select";
import {CustomerDashboardModule} from "../customer-dashboard/customer-dashboard.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {OrdersComponent} from './components/orders/orders.component';
import {ProductsComponent} from './components/products/products.component';
import {ClientsComponent} from './components/clients/clients.component';
import {EarningsComponent} from './components/earnings/earnings.component';
import {AnalysisComponent} from './components/analysis/analysis.component';
import {VendorDashboardBackgroundImagesPipe} from './pipes/vendor-dashboard-background-images.pipe';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {ItemViewModalComponent} from './components/item-view-modal/item-view-modal.component';
import {ItemEditModalComponent} from './components/item-edit-modal/item-edit-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    VendorDashboardComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    ProductsComponent,
    ClientsComponent,
    EarningsComponent,
    AnalysisComponent,
    VendorDashboardBackgroundImagesPipe,
    ItemViewModalComponent,
    ItemEditModalComponent
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
    MatButtonToggleModule,
    MatIconModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MdbCarouselModule,
    MatCheckboxModule
  ],

})
export class VendorDashboardModule {
}
