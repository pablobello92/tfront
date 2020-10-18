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
    LocalStorageService
} from './shared/services/localStorageService';
import {
    UsersService
} from './shared/services/usersService';
import {
    TracksService
} from './shared/services/tracksService';
import {
    ReparationsService
} from './shared/services/reparationsService';
import {
    DashboardComponent
} from './components/outlets/dashboard/dashboard.component';
import {
    SideBarComponent
} from './components/layout/sidebar/sidebar.component';
import {
    MenuModule
} from 'primeng/menu';
import {
    TableModule
} from 'primeng/table';
import {
    SidebarModule,
    ConfirmDialogModule,
    DropdownModule,
    PaginatorModule,
    InputTextareaModule,
    ColorPickerModule,
    TooltipModule,
    GrowlModule,
    CalendarModule,
    EditorModule,
    SliderModule,
    GMapModule
} from 'primeng/primeng';
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
    ConfirmationService
} from 'primeng/components/common/confirmationservice';
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
} from './shared/services/commonService';
import {
    ColorsService
} from './shared/services/colorsService';
import {
    CitiesService
} from './shared/services/citiesService';
import {
    UserEditComponent
} from './components/outlets/user/edit/user-edit.component';
import {
    UserTracksComponent
} from './components/outlets/user/tracks/user-tracks.component';
import {
    ColorInfoWidgetComponent
} from './components/outlets/user/tracks/color-info-widget/color-info-widget.component';
import {
    AdminToolsComponent
} from './components/outlets/admin/admin-tools/admin-tools.component';
import {
    ReparationsComponent
} from './components/outlets/admin/reparations/reparations/reparations.component';
import {
    SumarizedTracksComponent
} from './components/outlets/sumarized-tracks/sumarized-tracks.component';

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
        CalendarModule,
        ColorPickerModule,
        ConfirmDialogModule,
        DropdownModule,
        EditorModule,
        HttpClientModule,
        InputTextareaModule,
        MenuModule,
        PaginatorModule,
        SidebarModule,
        SliderModule,
        TableModule,
        TooltipModule,
        GrowlModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,
        GMapModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        AppConfig,
        UsersService,
        TracksService,
        ReparationsService,
        CitiesService,
        LocalStorageService,
        CommonService,
        ColorsService,
        TranslateService,
        ConfirmationService,
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
