import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerDashboardComponent} from './customer-dashboard.component';
import {BuyingPageComponent} from "./components/buying-page/buying-page.component";
import {UpdateOrderComponent} from "./components/update-order/update-order.component";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [{
  path: '', component: CustomerDashboardComponent, children: [
    {
      path: 'sub-01',
      loadChildren: () => import('./modules/sub-customer-dashboard1/sub-customer-dashboard1.module').then(m => m.SubCustomerDashboard1Module)
    },
    {
      path: 'sub-02',
      loadChildren: () => import('./modules/sub-customer-dashboard2/sub-customer-dashboard2.module').then(m => m.SubCustomerDashboard2Module)
    },

  ]
}, {
  path: 'BuyingPage',
  component: BuyingPageComponent
}, {path: 'ViewUpdateOrder', component: UpdateOrderComponent},


]

@NgModule({
  imports: [RouterModule.forChild(routes),
    HttpClientModule
  ],


  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule {
}
