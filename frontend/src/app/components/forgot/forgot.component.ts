import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  email = null;
  constructor(
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  forgot(email: string) {
    this.authenticationService.forgot(email).subscribe(u => this.setUser());
  }

  private setUser(){
    this.authenticationService.currentUser.subscribe(u =>{
      this.email = u;
    })
  }

}
