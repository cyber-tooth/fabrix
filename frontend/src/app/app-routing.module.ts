import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {
  DashboardComponent,
  AboutComponent,
  RegisterComponent,
  ConfirmationComponent,
  ResetComponent, ForgotComponent, LoginComponent
} from './components/index';
import {AuthGuardUser, AuthGuardAdmin} from './guards/index';
import {HomeComponent} from "./components/home/home.component";
import {MailSentComponent} from "./components/mail-sent/mail-sent.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ImpressumComponent} from "./components/impressum/impressum.component";
import {MaterialComponent} from "./components/material/material.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email/:token', component: ConfirmationComponent},
  {path: 'reset-password/:token', component: ResetComponent},
  {path: 'forgot-password', component: ForgotComponent},
  {path: 'mail-sent', component: MailSentComponent},
  {path: 'material', component: MaterialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
