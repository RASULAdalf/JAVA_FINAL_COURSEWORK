import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthRoutingModule} from './auth-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { ItemModalComponent } from './module/customer-dashboard/components/item-modal/item-modal.component';
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {MatDialogModule} from "@angular/material/dialog";
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CustomerDashboardInterceptor} from "./module/customer-dashboard/interceptors/customer-dashboard.interceptor";
import { LetSirKnowComponent } from './core/components/let-sir-know/let-sir-know.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";



export const firebaseConfig = {

  apiKey: "AIzaSyBQ-JuMJVuEOOyB-BCVb0yDoJoRGsJXRdU",

  authDomain: "final-app-cmjd95.firebaseapp.com",

  projectId: "final-app-cmjd95",

  storageBucket: "final-app-cmjd95.appspot.com",

  messagingSenderId: "691752234025",

  appId: "1:691752234025:web:b45e1e02f23333b9e08038",

  measurementId: "G-WMZM99B42S"

};


@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    ItemModalComponent,
    LetSirKnowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MdbModalModule,
    MatDialogModule,
    MdbCarouselModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  providers: [CookieService,{provide:HTTP_INTERCEPTORS,useClass:CustomerDashboardInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
