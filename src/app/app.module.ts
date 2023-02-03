import {
    BrowserModule
} from '@angular/platform-browser';
import {
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
    NgModule
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    HttpClientModule,
    HttpClient
} from '@angular/common/http';
import {
    CookieService
} from 'ngx-cookie-service';

import {
    AgmCoreModule
} from '@agm/core';
import {
    MatButtonModule
} from '@angular/material/button';
import {
    MatButtonToggleModule
} from '@angular/material/button-toggle';
import {
    MatChipsModule
} from '@angular/material/chips';
import {
    MatDatepickerModule
} from '@angular/material/datepicker';
import {
    MatFormFieldModule
} from '@angular/material/form-field';
import {
    MatIconModule
} from '@angular/material/icon';
import {
    MatInputModule
} from '@angular/material/input';
import {
    MatNativeDateModule
} from '@angular/material/core';
import {
    MatListModule
} from '@angular/material/list';
import {
    MatSelectModule
} from '@angular/material/select';
import {
    MatSnackBarModule
} from '@angular/material/snack-bar';
import {
    MatTooltipModule
} from '@angular/material/tooltip'

import {
    NavbarComponent
} from './components/layout/navbar/navbar.component';
import {
    TranslateModule,
    TranslateLoader,
    TranslateService
} from '@ngx-translate/core';
import {
    TranslateHttpLoader
} from '@ngx-translate/http-loader';

import {
    AppRoutingModule
} from './app-routing.module';
import {
    AppComponent
} from './app.component';
import {
    HomeComponent
} from './components/home/home.component';
import {
    TracksService
} from './shared/services/tracks.service';
import {
    ReparationsService
} from './shared/services/reparations.service';
import {
    UsersService
} from './shared/services/users.service';
import {
    CookiesService
} from './shared/services/cookies.service';
import {
    SumarizationsService
} from './shared/services/sumarizations.service';
import {
    MapsService
} from './shared/services/maps.service';
import {
    DashboardComponent
} from './components/outlets/dashboard/dashboard.component';
import {
    SideBarComponent
} from './components/layout/sidebar/sidebar.component';
import {
    LoginComponent
} from './components/pages/login/login.component';
import {
    ErrorComponent
} from './components/pages/error/error.component';
import {
    CommonService
} from './shared/services/common.service';
import {
    ColorsService
} from './shared/services/colors.service';
import {
    CitiesService
} from './shared/services/cities.service';
import {
    UserEditComponent
} from './components/outlets/user/edit/user-edit.component';
import {
    UserTracksComponent
} from './components/outlets/user/user-tracks/user-tracks.component';
import {
    AdminToolsComponent
} from './components/outlets/admin/admin-tools/admin-tools.component';
import {
    ReparationsComponent
} from './components/outlets/admin/reparations/reparations.component';
import {
    SumarizedDataComponent
} from './components/outlets/sumarized-data/sumarized-data.component';
import {
    environment
} from '../environments/environment';

// AOT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DashboardComponent,
        SideBarComponent,
        NavbarComponent,
        UserEditComponent,
        UserTracksComponent,
        SumarizedDataComponent,
        AdminToolsComponent,
        ReparationsComponent,
        LoginComponent,
        ErrorComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'place_key_here'
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule
    ],
    exports: [
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule
    ],
    providers: [
        CommonService,
        TranslateService,
        CookieService,
        CookiesService,
        UsersService,
        TracksService,
        MapsService,
        SumarizationsService,
        ReparationsService,
        CitiesService,
        ColorsService,
        MatDatepickerModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
