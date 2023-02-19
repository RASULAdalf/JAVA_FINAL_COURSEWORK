import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ClothesComponent} from "./components/clothes/clothes.component";
import {BooksComponent} from "./components/books/books.component";
import {ElectronicsComponent} from "./components/electronics/electronics.component";
import {ElectricalComponent} from "./components/electrical/electrical.component";
import {CosmeticsComponent} from "./components/cosmetics/cosmetics.component";
import {OtherComponent} from "./components/other/other.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomerDashboardBackgroundImagesPipe } from './pipes/customer-dashboard-background-images.pipe';
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { CustmerBuyingCartItemImagesPipe } from './pipes/custmer-buying-cart-item-images.pipe';
import { BuyingPageComponent } from './components/buying-page/buying-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import { OrderComponent } from './components/order/order.component';
import { OrderModalComponent } from './components/order-modal/order-modal.component';
import { UpdateOrderComponent } from './components/update-order/update-order.component';
import { AddItemModalComponent } from './components/add-item-modal/add-item-modal.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { LoadingComponent } from './components/loading/loading.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CustomerDashboardInterceptor} from "./interceptors/customer-dashboard.interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
    declarations: [
        CustomerDashboardComponent,
        ClothesComponent,
        BooksComponent,
        ElectronicsComponent,
        ElectricalComponent,
        CosmeticsComponent,
        OtherComponent,
        CustomerDashboardBackgroundImagesPipe,
        CartModalComponent,
        CustmerBuyingCartItemImagesPipe,
        BuyingPageComponent,
        OrderComponent,
        OrderModalComponent,
        UpdateOrderComponent,
        AddItemModalComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        CustomerDashboardRoutingModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatPaginatorModule,
        ScrollingModule,
        MatInputModule,
        MatIconModule,
        MatBadgeModule,
        MatDialogModule,
        FormsModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    exports: [
        LoadingComponent
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: CustomerDashboardInterceptor, multi: true}]
})
export class CustomerDashboardModule { }
