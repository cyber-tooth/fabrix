import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule, NgbDropdownModule, NgbDropdown, NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  HeaderComponent, ListeComponent, DashboardComponent, AboutComponent, TasksComponent,
  RegisterComponent, FooterComponent, LoginComponent, ForgotComponent, ResetComponent, ConfirmationComponent
} from './components/index';
import {
  BsDropdownModule,
} from 'ngx-bootstrap/dropdown';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {
  AuthenticationService,
  AuthorisationService,
  CategoriesServices,
  MaterialService,
  UserService
} from './services/index';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ValidationMsgComponent} from './components/validation/validation-msg.component';
import { MailSentComponent } from './components/mail-sent/mail-sent.component';
import { ContactComponent } from './components/contact/contact.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialComponent } from './components/material/material.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { EditMaterialComponent } from './components/edit-material/edit-material.component';
import {ErrorInterceptor, JwtInterceptor} from './helpers';
import { AgbComponent } from './components/agb/agb.component';
import { DatenschutzComponent } from './components/datenschutz/datenschutz.component';
import { FaqComponent } from './components/faq/faq.component';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AddMaterialComponent } from './components/add-material/add-material.component';
import {AuthGuardAdmin, AuthGuardUser, AuthGuardSuperAdmin} from './guards';
import { MaterialcardListComponent } from './components/materialcard-list/materialcard-list.component';
import { MaterialcardItemComponent } from './components/materialcard-item/materialcard-item.component';
import { MaterialCardComponent } from './components/material-card/material-card.component';
import { FilterCardComponent } from './components/filter-card/filter-card.component';
import { RoleDropdownComponent } from './components/role-dropdown/role-dropdown.component';
import { SearchPipe} from './components/search.pipe';
import { CreateCategoryModalComponent } from './components/create-category-modal/create-category-modal.component';

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
    MaterialcardListComponent,
    MaterialcardItemComponent,
    MaterialCardComponent,
    FilterCardComponent,
    RoleDropdownComponent,
    SearchPipe,
    CreateCategoryModalComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    MultiselectDropdownModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgxBootstrapSliderModule,
    NgxSliderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
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
    AuthGuardSuperAdmin,
    AuthGuardAdmin,
    AuthGuardUser,
    UserService,
    MaterialService,
    CategoriesServices,
    NgbDropdown,
    NgbAlertConfig
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
