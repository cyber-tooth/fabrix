import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {
  AboutComponent,
  RegisterComponent,
  ConfirmationComponent,
  ResetComponent, ForgotComponent, LoginComponent
} from './components/index';
import {HomeComponent} from './components/home/home.component';
import {MailSentComponent} from './components/mail-sent/mail-sent.component';
import {ContactComponent} from './components/contact/contact.component';
import {ImpressumComponent} from './components/impressum/impressum.component';
import {MaterialComponent} from './components/material/material.component';
import {ManageUsersComponent} from './components/manage-users/manage-users.component';
import {EditMaterialComponent} from './components/edit-material/edit-material.component';
import {AgbComponent} from './components/agb/agb.component';
import {DatenschutzComponent} from './components/datenschutz/datenschutz.component';
import {FaqComponent} from './components/faq/faq.component';
import {AuthGuardSuperAdmin, AuthGuardUser, AuthGuardAdmin} from './guards/index';
import {AddMaterialComponent} from './components/add-material/add-material.component';
import {FilterCardComponent} from './components/filter-card/filter-card.component';
import {MaterialCardComponent} from './components/material-card/material-card.component';
import {MaterialcardListComponent} from './components/materialcard-list/materialcard-list.component';
import {RoleDropdownComponent} from "./components/role-dropdown/role-dropdown.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email/:token', component: ConfirmationComponent},
  {path: 'reset-password/:token', component: ResetComponent},
  {path: 'forgot-password', component: ForgotComponent},
  {path: 'mail-sent', component: MailSentComponent},
  {path: 'material', component: MaterialComponent},
  {path: 'agb', component: AgbComponent},
  {path: 'datenschutz', component: DatenschutzComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'manage-users', component: ManageUsersComponent,
    canActivate: [AuthGuardSuperAdmin]},
  {path: 'edit-material', component: EditMaterialComponent,
    canActivate: [AuthGuardAdmin]},
  {path: 'materialcard-list', component: MaterialcardListComponent},
  {path: 'materialcard-list/materialcard-item', component: MaterialcardListComponent},
  {path: 'materialcard-list/materialCard/id', component: MaterialCardComponent},
  {path: 'materialcard-list/materialCard/id', component: MaterialCardComponent},
  {path: 'materialcard-list/materialCard', component: MaterialCardComponent},
  {path: 'materialCard', component: MaterialCardComponent},
  {path: 'filter-card', component: FilterCardComponent},
  {path: 'add-material', component: AddMaterialComponent,
    canActivate: [AuthGuardSuperAdmin]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

