import {Component, OnInit} from '@angular/core';
import {AuthenticationService, AuthorisationService} from "../../services";
import {faSearch, faSignInAlt, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  faUserIcon = faUser;
  faSearchIcon = faSearch;
  faSignOutAltIcon = faSignOutAlt;
  faSignInAltIcon = faSignInAlt;

  constructor(private authenticationService: AuthenticationService,
              private authorisationService: AuthorisationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  searchClick() {

  }

  isLoggedIn() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      return true;
    }
    return false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
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
