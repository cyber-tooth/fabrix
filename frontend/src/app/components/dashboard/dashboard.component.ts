import { Component, OnInit } from '@angular/core';
import {AuthenticationService, AuthorisationService} from "../../services";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  text = 'Additional Info-Text on our Info Box! 🎊';
  hidden = true;

  constructor(private authenticationService: AuthenticationService,
              private authorisationService: AuthorisationService) {}

    ngOnInit()
    {
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
