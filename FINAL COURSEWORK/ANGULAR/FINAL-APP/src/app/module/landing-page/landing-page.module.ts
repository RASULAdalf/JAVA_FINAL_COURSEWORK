import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LandingPageRoutingModule} from './landing-page-routing.module';
import {LandingPageComponent} from './landing-page.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MatSnackBarModule,
  ]
})
export class LandingPageModule {
}
