import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VendorDashboardComponent} from './vendor-dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {VendorDashboardGuard} from "./guards/vendor-dashboard.guard";

const routes: Routes = [{
  path: '',
  canActivate: [VendorDashboardGuard],
  component: VendorDashboardComponent
}, {path: 'login', component: LoginComponent}, {path: 'register', component: RegisterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDashboardRoutingModule {
}
