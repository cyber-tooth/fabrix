import {Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from "../../services";
import {Router} from "@angular/router";
import {User} from "../../models";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertComponent} from "ngx-bootstrap/alert";
import {CustomValidators} from "../../helpers/custom-validators";

@Component({
  selector: 'htw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  notification = '';
  strengthChange = 0;
  registerForm: FormGroup;
  registerFormSubmitAttempt: boolean;


  // notification
  public alerts: any[] = [];

  constructor(
    private form: FormBuilder,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    this.registerForm =
      this.form.group({
          email: [null, [Validators.required, Validators.email]],
          acceptTerms: [true],
          firstName: [null, [<any>Validators.required]],
          lastName: [null, [<any>Validators.required]],
          firmenname: [null],
          password: [
            null,
            Validators.compose([
              Validators.required,
              // check whether the entered password has a number
              CustomValidators.patternValidator(/\d/, {
                hasNumber: true
              }),
              // check whether the entered password has upper case letter
              CustomValidators.patternValidator(/[A-Z]/, {
                hasCapitalCase: true
              }),
              // check whether the entered password has a lower case letter
              CustomValidators.patternValidator(/[a-z]/, {
                hasSmallCase: true
              }),
              // check whether the entered password has a special character
              CustomValidators.patternValidator(
                /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                {
                  hasSpecialCharacters: true
                }
              ),
              Validators.minLength(8)
            ])
          ],
          confirmPassword: [null, Validators.compose([Validators.required])]
        },
        {
          // check whether our password and confirm password match
          validator: CustomValidators.passwordMatchValidator
        }
      );

    this.registerFormSubmitAttempt = false;
  }

  register() {
    this.registerFormSubmitAttempt = true;
    if (this.registerForm.valid) {
      this.userService.create(this.registerForm.value)
        .subscribe(
          data => {
            if (data) {
              this.router.navigate(['/mail-sent']);
            }
          },
          error => {
            console.log(error);
            this.pushNotification(error.message, 'danger');
          });
    } else {
      // validate all form fields
      this.validateAllFormFields(this.registerForm);
    }
    this.registerFormSubmitAttempt = false;
  }

  checkPasswordStrength(value) {
    this.strengthChange = value;
  }

  isRegisterFieldValid(field: string) {
    return (!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
      (this.registerForm.get(field).untouched && this.registerFormSubmitAttempt);
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
