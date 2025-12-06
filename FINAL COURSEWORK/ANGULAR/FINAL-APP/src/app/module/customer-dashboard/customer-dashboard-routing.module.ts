import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerDashboardComponent} from './customer-dashboard.component';
import {BuyingPageComponent} from "./components/buying-page/buying-page.component";
import {UpdateOrderComponent} from "./components/update-order/update-order.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomerDashboardInterceptor} from "./interceptors/customer-dashboard.interceptor";

const routes: Routes = [{path: '', component: CustomerDashboardComponent}, {
  path: 'BuyingPage',
  component: BuyingPageComponent
}, {path: 'ViewUpdateOrder', component: UpdateOrderComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes),
  HttpClientModule
  ],

  providers: [{provide: HTTP_INTERCEPTORS, useClass: CustomerDashboardInterceptor, multi: true}],

  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule {
}
