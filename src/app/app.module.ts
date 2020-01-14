import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {SlideshowModule} from 'ng-simple-slideshow';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { PermissionDeniedComponent } from './frontend/permission-denied/permission-denied.component';
import { PageNotFoundComponent } from './frontend/page-not-found/page-not-found.component';
import { AlertDialogComponent } from './util/alert/alert-dialog.component';
import {SimpleModalModule} from "ngx-simple-modal";
import { ConfirmDialogComponent } from './util/confirm/confirm-dialog.component';
import { PromptDialogComponent } from './util/prompt/prompt-dialog/prompt-dialog.component';
import {ChartsModule} from "ng2-charts";
import { DishDetailComponent } from './frontend/dish-detail/dish-detail.component';
import { JobDetailComponent } from './frontend/job-detail/job-detail.component';
import { CartComponent } from './frontend/cart/cart.component';
import { MenuComponent } from './frontend/menu/menu.component';
import { ReservationComponent } from './frontend/reservation/reservation.component';
import { JobComponent } from './frontend/job/job.component';
import { ConfirmationComponent } from './frontend/confirmation/confirmation.component';
import { CheckoutComponent } from './frontend/checkout/checkout.component';
import { FrontendFooterComponent } from './frontend/frontend-footer/frontend-footer.component';
import { FrontendHeaderComponent } from './frontend/frontend-header/frontend-header.component';
import { DialogComponent } from './util/dialog/dialog.component';
import { TrackComponent } from './frontend/track/track.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import { AboutUsComponent } from './frontend/about-us/about-us.component';
import { FrontendComponent } from './frontend/frontend/frontend.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PermissionDeniedComponent,
    PageNotFoundComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
    DishDetailComponent,
    JobDetailComponent,
    CartComponent,
    MenuComponent,
    ReservationComponent,
    JobComponent,
    ConfirmationComponent,
    CheckoutComponent,
    FrontendFooterComponent,
    FrontendHeaderComponent,
    DialogComponent,
    TrackComponent,
    AboutUsComponent,
    FrontendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    SlideshowModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:'toast-center-center',
      timeOut: 4000
    }),
    SimpleModalModule.forRoot({container: "modal-container"}),
    ChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
    DialogComponent]
})
export class AppModule { }
