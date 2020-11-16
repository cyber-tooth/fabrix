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

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email/:token', component: ConfirmationComponent},
  {path: 'reset-password/:token', component: ResetComponent},
  {path: 'forgot-password', component: ForgotComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
