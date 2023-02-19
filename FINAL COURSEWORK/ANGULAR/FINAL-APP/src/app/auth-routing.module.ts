import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';
import {LandingPageComponent} from "./module/landing-page/landing-page.component";

const config = {
  domain: 'dev-1b212clo.us.auth0.com',
  clientId: 'QXJHgOuSHAtRI6kh8vcucynqYHOHUyRQ',
  redirectUri: window.location.origin + '/CustomerDashboard',
  httpInterceptor: {
    allowedList: ['/api/*']
  },
};

const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {
    path: 'landing',
    component: LandingPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule.forRoot(config),
    AuthModule.forRoot(config),
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
