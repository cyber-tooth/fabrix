import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AlertComponent} from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
   alerts: any[] = [];
  forgotFormSubmitAttempt = false;

  constructor(
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
    });
  }

  forgot() {
    this.forgotFormSubmitAttempt = true;
    this.authenticationService.forgot(this.forgotForm.value.email)
      .subscribe(
        succ => {
          this.pushNotification(succ.message, 'success');
        },
        error => {
          this.pushNotification(error.message, 'danger');
        });
    this.forgotFormSubmitAttempt = false;
  }

  isForgotFieldValid(field: string): boolean {
    return (!this.forgotForm.get(field).valid && this.forgotForm.get(field).touched) ||
      (this.forgotForm.get(field).untouched && this.forgotFormSubmitAttempt);
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


  onCloseNotification(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  pushNotification(msg, type): void {
    this.alerts = [];
    this.alerts.push({
      type,
      msg
    });
  }
}
