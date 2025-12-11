import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerDashboardBackgroundImagesPipe} from './pipes/customer-dashboard-background-images.pipe';


@NgModule({
  declarations: [
    CustomerDashboardBackgroundImagesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomerDashboardBackgroundImagesPipe
  ]
})
export class CustomerDashboardSharedModule {
}
