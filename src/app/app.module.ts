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
  AppConstants
} from './configs/app.constants';
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
  ReservationsService
} from './shared/services/reservationsService';
import {
  ProvidersService
} from './shared/services/providersService';
import {
  CommonService
} from './shared/services/commonService';
import {
  UserEditComponent
} from './components/outlets/user/edit/user-edit.component';
import {
    UserTracksComponent
} from './components/outlets/user/tracks/user-tracks.component';



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
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MenuModule,
    TableModule,
    SidebarModule,
    EditorModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextareaModule,
    PaginatorModule,
    ColorPickerModule,
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
    AppConstants,
    UsersService,
    TracksService,
    ReservationsService,
    ProvidersService,
    LocalStorageService,
    CommonService,
    TranslateService,
    ConfirmationService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
