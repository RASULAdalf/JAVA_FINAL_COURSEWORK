import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubCustomerDashboard1Component} from './sub-customer-dashboard1.component';
import {ElectronicsComponent} from "./components/electronics/electronics.component";
import {ElectricalComponent} from "./components/electrical/electrical.component";
import {BooksComponent} from "./components/books/books.component";
import {ClothesComponent} from "./components/clothes/clothes.component";

const routes: Routes = [

  {path: '', component: SubCustomerDashboard1Component},
  {path: 'electronics', component: ElectronicsComponent},
  {path: 'electrical', component: ElectricalComponent},
  {path: 'books', component: BooksComponent},
  {path: 'clothes', component: ClothesComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCustomerDashboard1RoutingModule {
}
