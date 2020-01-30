import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {PermissionDeniedComponent} from "./frontend/permission-denied/permission-denied.component";
import {PageNotFoundComponent} from "./frontend/page-not-found/page-not-found.component";
import {UserManagementComponent} from "./management/sysadmin/user-management/user-management.component";
import {SaleManagementComponent} from "./management/restaurant/sale-management/sale-management.component";
import {HrManagementComponent} from "./management/hr/hr-management/hr-management.component";
import {StockManagementComponent} from "./management/stock/stock-management/stock-management.component";
import {AccountingManagementComponent} from "./management/accounting/accounting-management/accounting-management.component";
import {PermissionPageComponent} from "./management/permission-page/permission-page.component";
import {DishDetailComponent} from "./frontend/dish-detail/dish-detail.component";
import {JobDetailComponent} from "./frontend/job-detail/job-detail.component";
import {CartComponent} from "./frontend/cart/cart.component";
import {ReservationComponent} from "./frontend/reservation/reservation.component";
import {JobComponent} from "./frontend/job/job.component";
import {CheckoutComponent} from "./frontend/checkout/checkout.component";
import {ConfirmationComponent} from "./frontend/confirmation/confirmation.component";
import {TrackComponent} from "./frontend/track/track.component";
import {AboutUsComponent} from "./frontend/about-us/about-us.component";
import {MenuComponent} from "./frontend/menu/menu.component";

const routes: Routes = [

  // start from here
  {
    path: 'auth/login',
    component: LoginComponent
  },


  // Front end
  // {
  //   path: 'home',
  //   component: FrontendComponent
  // },

  {
    path: 'menu/detail/:id',
    component: DishDetailComponent
  },
  {
    path: 'jobs/detail/:id',
    component: JobDetailComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'reservation',
    component: ReservationComponent
  },
  {
    path: 'jobs',
    component: JobComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'confirmation/:orderId',
    component: ConfirmationComponent
  },
  {
    path: 'track',
    component: TrackComponent
  },

  {
    path: 'about-us',
    component: AboutUsComponent
  },



  // HR
  {
    path: 'management/humanresource',
    component: HrManagementComponent
  },

  // Accounting
  {
    path: 'management/accounting',
    component: AccountingManagementComponent
  },

  // Restaurant
  {
    path: 'management/sale',
    component: SaleManagementComponent
  },

  // Sysadmin
  {
    path: 'management/sysadmin',
    component: UserManagementComponent
  },

  // stock
  {
    path: 'management/stock',
    component: StockManagementComponent
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'management/403',
    component: PermissionPageComponent
  },
  {
    path: '403',
    component: PermissionDeniedComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
