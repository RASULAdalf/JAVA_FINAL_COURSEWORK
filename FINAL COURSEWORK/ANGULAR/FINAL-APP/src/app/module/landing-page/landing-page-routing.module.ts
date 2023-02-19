import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page.component';
import {CommonModule} from "@angular/common";
import {AuthHttpInterceptor, AuthModule} from "@auth0/auth0-angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

const config = {
  domain: 'dev-1b212clo.us.auth0.com',
  clientId: 'QXJHgOuSHAtRI6kh8vcucynqYHOHUyRQ',
  redirectUri: window.location.origin + '/landing',
  httpInterceptor: {
    allowedList: ['/api/*']
  },
};
const routes: Routes = [{path: '', component: LandingPageComponent}];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule.forRoot(config),
    RouterModule.forChild(routes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}
  ],
  exports: [RouterModule]
})
export class LandingPageRoutingModule {
}
