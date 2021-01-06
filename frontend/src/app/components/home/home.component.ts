import { Component, OnInit } from '@angular/core';
import {AuthenticationService, AuthorisationService} from "../../services";
import {NgbAlertConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private authorisationService: AuthorisationService,
              alertConfig: NgbAlertConfig) {
    // customize default values of alerts used by this component tree
    alertConfig.type = 'secondary';
    alertConfig.dismissible = false;
  }

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
