import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'htw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  person: {
    firstname;
    lastname;
   
    email;
    id;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
