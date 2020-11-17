import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  NavigationBarComponent, ListeComponent, DashboardComponent, AboutComponent, TasksComponent,
  RegisterComponent, FooterComponent, LoginComponent, ForgotComponent, ResetComponent, ConfirmationComponent
} from './components/index';

import {AuthenticationService, UserService} from './services/index';
import { HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import { HomeComponent } from './components/home/home.component';

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
    NavigationBarComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    ConfirmationComponent,
    ForgotComponent,
    ResetComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
