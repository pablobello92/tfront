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
    UserEditComponent
} from './components/outlets/user/edit/user-edit.component';
import {
    UserTracksComponent
} from './components/outlets/tracks/user-tracks/user-tracks.component';
import {
    SumarizedTracksComponent
} from './components/outlets/tracks/sumarized-tracks/sumarized-tracks.component';
import {
    AdminToolsComponent
} from './components/outlets/admin/admin-tools/admin-tools.component';
import {
    ReparationsComponent
} from './components/outlets/admin/reparations/reparations.component';
import {
    LoginComponent
} from './components/pages/login/login.component';
import {
    ErrorComponent
} from './components/pages/error/error.component';
import {
    IsAdminGuard
} from './shared/services/guards/is-admin.guard';



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
                path: 'user/edit',
                component: UserEditComponent
            },
            {
                path: 'user/tracks',
                component: UserTracksComponent
            },
            {
                path: 'sumarized-tracks',
                component: SumarizedTracksComponent
            },
            {
                path: 'admin/tools',
                component: AdminToolsComponent,
                canActivate: [
                    IsAdminGuard
                ]
            },
            {
                path: 'admin/reparations',
                component: ReparationsComponent
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
