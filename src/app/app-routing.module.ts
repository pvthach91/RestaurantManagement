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
import {FrontendComponent} from "./frontend/frontend/frontend.component";

const routes: Routes = [

  // start from here
  {
    path: 'auth/login',
    component: LoginComponent
  },


  // Front end
  {
    path: 'home',
    component: FrontendComponent
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
    redirectTo: 'home',
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
