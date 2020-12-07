import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule, NgbDropdownModule, NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  HeaderComponent, ListeComponent, DashboardComponent, AboutComponent, TasksComponent,
  RegisterComponent, FooterComponent, LoginComponent, ForgotComponent, ResetComponent, ConfirmationComponent
} from './components/index';
import {
  BsDropdownModule,
} from 'ngx-bootstrap/dropdown';
import {AuthenticationService, AuthorisationService, UserService} from './services/index';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {ValidationMsgComponent} from "./components/validation/validation-msg.component";
import { MailSentComponent } from './components/mail-sent/mail-sent.component';
import { ContactComponent } from './components/contact/contact.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialComponent } from './components/material/material.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { EditMaterialComponent } from './components/edit-material/edit-material.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import {ErrorInterceptor, JwtInterceptor} from "./helpers";

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ListeComponent,
    DashboardComponent,
    AboutComponent,
    TasksComponent,
    HeaderComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    ConfirmationComponent,
    ForgotComponent,
    ResetComponent,
    HomeComponent,
    ValidationMsgComponent,
    MailSentComponent,
    ContactComponent,
    ImpressumComponent,
    MaterialComponent,
    ManageUsersComponent,
    EditMaterialComponent,
    SuperAdminComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost', 'htwhost.com'],
        disallowedRoutes: ['example.com/examplebadroute/']
      }
    }),
    ReactiveFormsModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    NgbModule,
    NgbDropdownModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthenticationService,
    AuthorisationService,
    UserService,
    NgbDropdown
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
