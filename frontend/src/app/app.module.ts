import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  HeaderComponent, ListeComponent, DashboardComponent, AboutComponent, TasksComponent,
  RegisterComponent, FooterComponent, LoginComponent, ForgotComponent, ResetComponent, ConfirmationComponent
} from './components/index';

import {AuthenticationService, AuthorisationService, UserService} from './services/index';
import { HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {ValidationMsgComponent} from "./components/validation/validation-msg.component";
import { MailSentComponent } from './components/mail-sent/mail-sent.component';
import { ContactComponent } from './components/contact/contact.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    ImpressumComponent
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
  ],
  providers: [
    AuthenticationService,
    AuthorisationService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
