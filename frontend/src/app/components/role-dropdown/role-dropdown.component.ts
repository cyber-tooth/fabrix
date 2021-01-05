import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models";
import {UserService} from "../../services";
import {HttpErrorResponse} from "@angular/common/http";
import RoleEnum = User.RoleEnum;
import {ActivatedRoute} from "@angular/router";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-role-dropdown',
  templateUrl: './role-dropdown.component.html',
  styleUrls: ['./role-dropdown.component.css'],
})
export class RoleDropdownComponent implements OnInit {
  @Input() currentUser: User;
  userList: Array<User>;
  form: FormGroup;
  error: HttpErrorResponse;
  options: RoleEnum[];
  selectedOption: RoleEnum;
  closeResult = '';

  constructor(private fb: FormBuilder, private userService: UserService,
              private route: ActivatedRoute,
              private config: NgbModalConfig,
              private modalService: NgbModal) {
    this.form = this.fb.group(
      {
        roleControl: ['', Validators.required]
      }
    );
  }
  ngOnInit() {
    this.setUsers();
    if (this.currentUser.role === RoleEnum.admin) {
      this.options = [
        RoleEnum.user,
        RoleEnum.superAdmin,
      ];
    }
    if (this.currentUser.role === RoleEnum.superAdmin) {
      this.options = [
        RoleEnum.user,
        RoleEnum.admin,
      ];
    }
    if (this.currentUser.role === RoleEnum.user) {
      this.options = [
        RoleEnum.admin,
        RoleEnum.superAdmin,
      ];
    }
    this.selectedOption = this.currentUser?.role;
    this.form.patchValue({
     roleControl: this.currentUser?.role,
    });
  }
  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      if (result === 'update')
      {
        this.onSubmit();
      }
    });
  }
  update(user: User): void {
    this.currentUser = user;
    this.userService.update(this.currentUser).subscribe(u => this.setUsers());
    /* window.location.reload(); */
    console.log(this.currentUser.role + " Rolle geändert");
  }
  onSubmit(): void {
    console.log("bei submit");
    const values = this.form.value;;
    this.currentUser.role = values.roleControl;
    this.update(this.currentUser);
    console.warn(this.form.value);
  }
  private setUsers(): void {
    this.userService.getAll().subscribe(u => {
      this.userList = u as User[];
    });
  }
}


