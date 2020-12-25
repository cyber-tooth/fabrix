import { Component, OnInit } from '@angular/core';
import {AuthenticationService, AuthorisationService} from "../../services";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private authorisationService: AuthorisationService) {}

  ngOnInit(): void {
  }

  getFirstName()
  {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      return JSON.parse(localStorage.getItem('currentUser')).firstName;
    } else {
      return '';
    }
  }

  hasAccess(roles)
  {
    return this.authorisationService.hasAccess(roles);
  }
}
