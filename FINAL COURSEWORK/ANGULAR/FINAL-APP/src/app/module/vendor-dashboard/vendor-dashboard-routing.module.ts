import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VendorDashboardComponent} from './vendor-dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {VendorDashboardGuard} from "./guards/vendor-dashboard.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomerDashboardInterceptor} from "../customer-dashboard/interceptors/customer-dashboard.interceptor";
import {VendorDashboardInterceptor} from "./interceptors/vendor-dashboard.interceptor";

const routes: Routes = [{
  path: '',
  canActivate: [VendorDashboardGuard],
  component: VendorDashboardComponent
}, {path: 'login', component: LoginComponent}, {path: 'register', component: RegisterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: VendorDashboardInterceptor, multi: true}],
  exports: [RouterModule]
})
export class VendorDashboardRoutingModule {
}
