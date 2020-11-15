import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  NavigationBarComponent, ListeComponent, DashboardComponent, AboutComponent, TasksComponent,
  RegisterComponent, FooterComponent, LoginComponent
} from './components/index';

import {AuthenticationService, UserService} from './services/index';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
