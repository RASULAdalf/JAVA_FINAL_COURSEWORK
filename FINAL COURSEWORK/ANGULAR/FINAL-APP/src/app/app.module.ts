import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthRoutingModule} from './auth-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CookieService} from "ng2-cookies";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {NotFoundPageComponent} from './core/components/not-found-page/not-found-page.component';
import {ItemModalComponent} from './module/customer-dashboard/components/item-modal/item-modal.component';
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {MatDialogModule} from "@angular/material/dialog";
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RequestInterceptor} from "./core/interceptors/request-interceptor";
import {LetSirKnowComponent} from './core/components/let-sir-know/let-sir-know.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {getDatabase, provideDatabase } from "@angular/fire/database";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";


export const firebaseConfig = {

  apiKey: "AIzaSyDSaQjW2KRCFe3yVjTF5oOgfEi6dJnfLIY",

  authDomain: "angshop-cb664.firebaseapp.com",

  projectId: "angshop-cb664",

  storageBucket: "angshop-cb664.firebasestorage.app",

  messagingSenderId: "574130955540",

  appId: "1:574130955540:web:c090423cda7e23540c4e01",

  measurementId: "G-KKGW735HK3"


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
    //AngularFireAuthModule,
    //AngularFirestoreModule,
    //AngularFireStorageModule,
    //AngularFireDatabaseModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
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
  providers: [CookieService, {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
