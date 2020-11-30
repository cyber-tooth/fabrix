import {Component} from '@angular/core';
import {AuthenticationService, AuthorisationService} from "../../services";
import {faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  faUserIcon = faUser;

  constructor(private authenticationService: AuthenticationService,
              private authorisationService: AuthorisationService) {
  }

  isLoggedIn() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      return true;
    }
    return false;
  }

  logout() {
    this.authenticationService.logout();
  }

  getFirstName() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      return JSON.parse(localStorage.getItem('currentUser')).firstName;
    } else {
      return '';
    }
  }

  hasAccess(roles) {
    return this.authorisationService.hasAccess(roles);
  }

}
