import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardGuard} from "./module/admin-dashboard/guards/admin-dashboard.guard";
import {CustomerDashboardGuard} from "./module/customer-dashboard/guards/customer-dashboard.guard";
import {NotFoundPageComponent} from "./core/components/not-found-page/not-found-page.component";


const routes: Routes = [{path: '', redirectTo: '/landing', pathMatch: 'full'}, {
  path: 'landing',
  loadChildren: () => import('./module/landing-page/landing-page.module').then(m => m.LandingPageModule)
},


  {
    path: 'VendorDashboard',
    loadChildren: () => import('./module/vendor-dashboard/vendor-dashboard.module').then(m => m.VendorDashboardModule)
  },
  { path: 'AdminDashboard',canActivate:[AdminDashboardGuard], loadChildren: () => import('./module/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
  { path: 'CustomerDashboard',canActivate:[CustomerDashboardGuard], loadChildren: () => import('./module/customer-dashboard/customer-dashboard.module').then(m => m.CustomerDashboardModule) },
  {path:'**',component:NotFoundPageComponent,pathMatch:'full'},

];


@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
