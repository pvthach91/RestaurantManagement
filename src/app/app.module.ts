import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { EmployeeComponent } from './management/hr/employee/employee.component';
import { LeaveComponent } from './management/hr/leave/leave.component';
import { DishDetailComponent } from './frontend/dish-detail/dish-detail.component';
import { JobDetailComponent } from './frontend/job-detail/job-detail.component';
import { CartComponent } from './frontend/cart/cart.component';
import { MenuComponent } from './frontend/menu/menu.component';
import { ReservationComponent } from './frontend/reservation/reservation.component';
import { TimesheetComponent } from './management/hr/timesheet/timesheet.component';
import { JobComponent } from './frontend/job/job.component';
import { ConfirmationComponent } from './frontend/confirmation/confirmation.component';
import {ReportComponent} from "./management/accounting/report/report.component";
import { CheckoutComponent } from './frontend/checkout/checkout.component';
import { FrontendFooterComponent } from './frontend/frontend-footer/frontend-footer.component';
import { FrontendHeaderComponent } from './frontend/frontend-header/frontend-header.component';
import { DishComponent } from './management/restaurant/dish/dish.component';
import { DialogComponent } from './util/dialog/dialog.component';
import { DishFormComponent } from './management/restaurant/dish/dish-form/dish-form.component';
import { TrackComponent } from './frontend/track/track.component';
import { OrderComponent } from './management/restaurant/order/order.component';
import { OrderDetailComponent } from './management/restaurant/order/order-detail/order-detail.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import { ReservationManagementComponent } from './management/restaurant/reservation-management/reservation-management.component';
import { UserManagementComponent } from './management/sysadmin/user-management/user-management.component';
import { IngredientComponent } from './management/stock/ingredient/ingredient.component';
import { IngredientFormComponent } from './management/stock/ingredient/ingredient-form/ingredient-form.component';
import { StockReceivedFormComponent } from './management/stock/stock-received/stock-received-form/stock-received-form.component';
import { StockReceivedComponent } from './management/stock/stock-received/stock-received/stock-received.component';
import { StockReceivedDetailComponent } from './management/stock/stock-received/stock-received-detail/stock-received-detail.component';
import { StockDeliverFormComponent } from './management/stock/stock-deliver/stock-deliver-form/stock-deliver-form.component';
import { StockDeliverComponent } from './management/stock/stock-deliver/stock-deliver/stock-deliver.component';
import { StockDeliverDetailComponent } from './management/stock/stock-deliver/stock-deliver-detail/stock-deliver-detail.component';
import { ManageJobComponent } from './management/hr/manage-job/manage-job.component';
import { ManageJobFormComponent } from './management/hr/manage-job/manage-job-form/manage-job-form.component';
import { EmployeeFormComponent } from './management/hr/employee/employee-form/employee-form.component';
import { LeaveFormComponent } from './management/hr/leave/leave-form/leave-form.component';
import { TimesheetFormComponent } from './management/hr/timesheet/timesheet-form/timesheet-form.component';
import { ReceiptComponent } from './management/accounting/receipt/receipt.component';
import { PayslipComponent } from './management/accounting/payslip/payslip.component';
import { PayrollComponent } from './management/accounting/payroll/payroll.component';
import { ReceiptFormComponent } from './management/accounting/receipt/receipt-form/receipt-form.component';
import { PayslipFormComponent } from './management/accounting/payslip/payslip-form/payslip-form.component';
import { PayrollFormComponent } from './management/accounting/payroll/payroll-form/payroll-form.component';
import { PayrollDetailComponent } from './management/accounting/payroll/payroll-detail/payroll-detail.component';
import { UserFormComponent } from './management/sysadmin/user-form/user-form.component';
import { AboutUsComponent } from './frontend/about-us/about-us.component';
import { SaleManagementComponent } from './management/restaurant/sale-management/sale-management.component';
import { MenuInfoComponent } from './management/menu-info/menu-info.component';
import { HrManagementComponent } from './management/hr/hr-management/hr-management.component';
import { StockManagementComponent } from './management/stock/stock-management/stock-management.component';
import { AccountingManagementComponent } from './management/accounting/accounting-management/accounting-management.component';
import { PermissionPageComponent } from './management/permission-page/permission-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PermissionDeniedComponent,
    PageNotFoundComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
    EmployeeComponent,
    LeaveComponent,
    DishDetailComponent,
    JobDetailComponent,
    CartComponent,
    MenuComponent,
    ReservationComponent,
    TimesheetComponent,
    JobComponent,
    ConfirmationComponent,
    ReportComponent,
    CheckoutComponent,
    FrontendFooterComponent,
    FrontendHeaderComponent,
    DishComponent,
    DialogComponent,
    DishFormComponent,
    TrackComponent,
    OrderComponent,
    OrderDetailComponent,
    ReservationManagementComponent,
    UserManagementComponent,
    IngredientComponent,
    IngredientFormComponent,
    StockReceivedFormComponent,
    StockReceivedComponent,
    StockReceivedDetailComponent,
    StockDeliverFormComponent,
    StockDeliverComponent,
    StockDeliverDetailComponent,
    ManageJobComponent,
    ManageJobFormComponent,
    EmployeeFormComponent,
    LeaveFormComponent,
    TimesheetFormComponent,
    ReceiptComponent,
    PayslipComponent,
    PayrollComponent,
    ReceiptFormComponent,
    PayslipFormComponent,
    PayrollFormComponent,
    PayrollDetailComponent,
    UserFormComponent,
    AboutUsComponent,
    SaleManagementComponent,
    MenuInfoComponent,
    HrManagementComponent,
    StockManagementComponent,
    AccountingManagementComponent,
    PermissionPageComponent
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
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
    DialogComponent,
    DishFormComponent,
    IngredientFormComponent,
    ManageJobFormComponent,
    EmployeeFormComponent,
    LeaveFormComponent,
    TimesheetFormComponent,
    ReceiptFormComponent,
    PayslipFormComponent,
    PayrollFormComponent,
    UserFormComponent]
})
export class AppModule { }
