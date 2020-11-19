import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from "../../services";
import {Router} from "@angular/router";
import {AlertComponent} from "ngx-bootstrap/alert";
import {User} from "../../models";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  notification = '';
  strengthChange = 0;
  currentUser: User;
  loginForm: FormGroup;
  loginFormSubmitAttempt: boolean;


  // notification
  public alerts: any[] = [];

  constructor(
    private form: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.loginForm = this.form.group({
      email: [null, [<any>Validators.required]],
      password: [null, [<any>Validators.required]],
    });

    this.loginFormSubmitAttempt = false;
  }

  checkPasswordStrength(value) {
    this.strengthChange = value;
    console.log(this.strengthChange);
  }

  login() {
    this.loginFormSubmitAttempt = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.authenticationService.login(email, password)
        .subscribe(
          data => {
            this.router.navigate(['/dashboard']);
          },
          error => {
            console.log(error.error.error);
            this.pushNotification(error.error.error, 'danger');
          });
    } else {
      // validate all form fields
      this.validateAllFormFields(this.loginForm);
    }
  }


  isLoginFieldValid(field: string) {
    return (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.loginFormSubmitAttempt);
  }

  validateAllFormFields(formGroup: FormGroup) {         // {1}
    Object.keys(formGroup.controls).forEach(field => {  // {2}
      const control = formGroup.get(field);
      if (control instanceof FormControl) {             // {4}
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {        // {5}
        this.validateAllFormFields(control);            // {6}
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  pushNotification(msg, type): void {
    this.alerts = [];
    this.alerts.push({
      type: type,
      msg: msg
    });
  }

  onCloseNotification(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}


