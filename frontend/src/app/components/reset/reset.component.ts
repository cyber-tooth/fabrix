import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../helpers/custom-validators";
import {Router} from "@angular/router";
import {UserService} from "../../services";
import {User} from "../../models";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  currentUser: User;
  resetForm: FormGroup;
  resetFormSubmitAttempt: boolean;

  constructor(
    private form: FormBuilder,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.resetForm =
      this.form.group({
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

    this.resetFormSubmitAttempt = false;
  }

//  changePasswort() {
//    this.userService.changePassword(confirmPassword, password, user.name, user.refreshToken);
//  }

}
