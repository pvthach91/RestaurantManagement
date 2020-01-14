import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {PermissionDeniedComponent} from "./frontend/permission-denied/permission-denied.component";
import {PageNotFoundComponent} from "./frontend/page-not-found/page-not-found.component";
import {FrontendComponent} from "./frontend/frontend/frontend.component";
import {MenuComponent} from "./frontend/menu/menu.component";

const routes: Routes = [

  // start from here
  {
    path: 'auth/login',
    component: LoginComponent
  },


  // Front end
  {
    path: 'home',
    component: MenuComponent
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
