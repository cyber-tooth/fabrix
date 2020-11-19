import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-validation-msg',
  templateUrl: './validation-msg.component.html'
})
export class ValidationMsgComponent {
  @Input() msg: string;
  @Input() display: boolean;
}
