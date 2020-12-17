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
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import {AuthenticationService, AuthorisationService, StoffeService, UserService} from './services/index';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {ErrorInterceptor, JwtInterceptor} from "./helpers";
import { AgbComponent } from './components/agb/agb.component';
import { DatenschutzComponent } from './components/datenschutz/datenschutz.component';
import { FaqComponent } from './components/faq/faq.component';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AddMaterialComponent } from './components/add-material/add-material.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

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
    AgbComponent,
    DatenschutzComponent,
    FaqComponent,
    AddMaterialComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgxBootstrapMultiselectModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgxBootstrapSliderModule,
    NgxSliderModule,
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
    NgbDropdownModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthenticationService,
    AuthorisationService,
    UserService,
    StoffeService,
    NgbDropdown
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
