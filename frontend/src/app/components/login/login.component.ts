import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit(): void {
    //TODO This only for testing, can be deleted if we add a login function
    this.authenticationService.login("aminskee@gmail.com", "pass123")
      .subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.log(error)
        });
  }

}
