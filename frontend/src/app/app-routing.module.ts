import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AboutComponent} from './components/about/about.component';
import {RegisterComponent} from './components/register/register.component';
import { AuthGuardUser, AuthGuardAdmin } from './guards/index';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
