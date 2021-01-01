import {Component, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models";
import RoleEnum = User.RoleEnum;
import {UserService} from "../../services";
import {HttpErrorResponse} from "@angular/common/http";
import {EventEmitter} from "events";

@Component({
  selector: 'app-role-dropdown',
  templateUrl: './role-dropdown.component.html',
  styleUrls: ['./role-dropdown.component.css'],
})
export class RoleDropdownComponent implements OnInit {
  @Input() user: User;
  @Output() updateEvent = new EventEmitter<User>();
  userList: Array<User>;
  form: FormGroup;
  error: HttpErrorResponse;
  options: RoleEnum[];
  selectedOption: RoleEnum;

  constructor(private fb: FormBuilder, private userService: UserService) {
  }
  ngOnInit() {
    this.options = [
      RoleEnum.user,
      RoleEnum.superAdmin,
      RoleEnum.admin,
    ];
    this.selectedOption = this.user?.role;
  }
  onChange(currentRole: RoleEnum): void {
    this.user.role = currentRole;
    this.selectedOption = currentRole;
    console.log(this.user);
    this.userService.update(this.user).subscribe(u => this.setUsers());
    window.location.reload();
  //  this.onSubmit();
  }
  onSubmit(): void {
    const values = this.form.value;
    this.user.role = values.role;
    this.updateEvent.emit(this.user);
  //  console.warn(this.form.value);
  }
  private setUsers(): void {
    this.userService.getAll().subscribe(u => {
      this.userList = u as User[];
    });
  }
}


