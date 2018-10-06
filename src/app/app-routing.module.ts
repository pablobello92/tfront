import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  HomeComponent
} from './components/home/home.component';
import {
  DashboardComponent
} from './components/outlets/dashboard/dashboard.component';
import {
  ServicesListComponent
} from './components/outlets/services/list/services-list.component';
import {
  ServicesEditComponent
} from './components/outlets/services/edit/services-edit.component';
import {
  LoginComponent
} from './components/pages/login/login.component';
import {
  ProviderEditComponent
} from './components/outlets/provider/edit/provider-edit.component';
import {
  ErrorComponent
} from './components/pages/error/error.component';



const routes: Routes = [{
    path: '',
    component: HomeComponent,
    children: [{
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'services/list',
        component: ServicesListComponent
      },
      {
        path: 'services/edit/:id',
        component: ServicesEditComponent
      },
      {
        path: 'provider/edit',
        component: ProviderEditComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
