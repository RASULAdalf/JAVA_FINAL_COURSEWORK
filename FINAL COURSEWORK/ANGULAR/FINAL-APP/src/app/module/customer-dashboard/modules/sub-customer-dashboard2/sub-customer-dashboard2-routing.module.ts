import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubCustomerDashboard2Component} from './sub-customer-dashboard2.component';
import {CosmeticsComponent} from "./components/cosmetics/cosmetics.component";
import {OtherComponent} from "./components/other/other.component";

const routes: Routes = [
  {path: '', component: SubCustomerDashboard2Component},
  {path: 'cosmetics', component: CosmeticsComponent},
  {path: 'other', component: OtherComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCustomerDashboard2RoutingModule {
}
