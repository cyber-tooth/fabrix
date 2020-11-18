import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from "../../services";
import {Router} from "@angular/router";
import {User} from "../../models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  text = 'Enter a secure password: at least 6 characters, including upper-case and lower-case letters and numbers.';
  hidden = true;

  constructor(
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userService.create(new User("Mr.", "amine", "mas",
      "aminskee@gmail.com", "pass123","pass123",true)).subscribe(
      data => {
        if (data) {
          console.log(data.message)
        }
      },
      error => {
        console.log(error.error)
      });
  }
}
