import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VendorDashboardComponent} from './vendor-dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {VendorDashboardGuard} from "./guards/vendor-dashboard.guard";
import {HttpClientModule} from "@angular/common/http";
import {OrdersComponent} from "./components/orders/orders.component";
import {ProductsComponent} from "./components/products/products.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {EarningsComponent} from "./components/earnings/earnings.component";
import {AnalysisComponent} from "./components/analysis/analysis.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [VendorDashboardGuard],
    component: VendorDashboardComponent,
    children: [{path: 'orders', component: OrdersComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'earnings', component: EarningsComponent},
      {path: 'analysis', component: AnalysisComponent},]
  }, {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule]
})
export class VendorDashboardRoutingModule {
}
