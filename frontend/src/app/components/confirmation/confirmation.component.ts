import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../services";
import {AlertComponent} from "ngx-bootstrap/alert";

@Component({
  selector: 'app-component',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  alerts = [];

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.token) {
        this.confirm(params.token);
      }
    });
  }

  private confirm(token: string) {
    this.authenticationService.confirm(token)
      .subscribe(data => {
        this.pushNotification('your email is confirmed', 'success');
      }, error => {
        this.pushNotification('token is expired', 'danger');
      })
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
