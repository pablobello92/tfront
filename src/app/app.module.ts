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
    HttpClient,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
    AppConfig
} from './configs/app.config';
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
    CalendarModule
} from 'primeng/calendar';
import {
    ColorPickerModule
} from 'primeng/colorpicker';
import {
    ConfirmDialogModule
} from 'primeng/confirmdialog';
import {
    DropdownModule
} from 'primeng/dropdown';
import {
    EditorModule
} from 'primeng/editor';
import {
    GMapModule
} from 'primeng/gmap';
import {
    InputTextareaModule
} from 'primeng/inputtextarea';
import {
    MenuModule
} from 'primeng/menu';
import {
    PaginatorModule
} from 'primeng/paginator';
import {
    SidebarModule
} from 'primeng/sidebar';
import {
    SliderModule
} from 'primeng/slider';
import {
    SpinnerModule
} from 'primeng/spinner';
import {
    TableModule
} from 'primeng/table';
import {
    ToastModule
} from 'primeng/toast';
import {
    TooltipModule
} from 'primeng/tooltip';
import {
    ConfirmationService
} from 'primeng/api';

import {
    MatFormFieldModule
} from '@angular/material/form-field';
import {
    MatSelectModule
} from '@angular/material/select';
import {
    MatListModule
} from '@angular/material/list';
import {
    MatDatepickerModule
} from '@angular/material/datepicker';
import {
    MatNativeDateModule
} from '@angular/material/core';
import {
    MatIconModule
} from '@angular/material/icon';
import {
    MatInputModule
} from '@angular/material/input';

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
    CookieService
} from 'ngx-cookie-service';
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
} from './components/outlets/tracks/user-tracks/user-tracks.component';
import {
    ColorInfoWidgetComponent
} from './components/outlets/tracks/color-info-widget/color-info-widget.component';
import {
    AdminToolsComponent
} from './components/outlets/admin/admin-tools/admin-tools.component';
import {
    ReparationsComponent
} from './components/outlets/admin/reparations/reparations.component';
import {
    SumarizedTracksComponent
} from './components/outlets/tracks/sumarized-tracks/sumarized-tracks.component';
// import { AuthInterceptorService } from './shared/services/authInterceptor.service';

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
        SumarizedTracksComponent,
        ColorInfoWidgetComponent,
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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CalendarModule,
        ColorPickerModule,
        ConfirmDialogModule,
        DropdownModule,
        EditorModule,
        InputTextareaModule,
        MenuModule,
        PaginatorModule,
        SidebarModule,
        SliderModule,
        TableModule,
        TooltipModule,
        ToastModule,
        FormsModule,
        GMapModule,
        SpinnerModule
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatIconModule,
        MatDatepickerModule
    ],
    providers: [
        CommonService,
        TranslateService,
        AppConfig,
        CookieService,
        CookiesService,
        UsersService,
        TracksService,
        MapsService,
        SumarizationsService,
        ReparationsService,
        CitiesService,
        ColorsService,
        ConfirmationService,
        MatDatepickerModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
