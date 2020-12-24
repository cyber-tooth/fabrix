import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services';
import {User} from '../../models';
import {faChevronCircleLeft, faUserMinus} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import RoleEnum = User.RoleEnum;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})

export class ManageUsersComponent implements OnInit {
  faUserMinusIcon = faUserMinus;
  faChevronCircleLeftIcon = faChevronCircleLeft;

  userList: Array<User> = [];
  user: User;
  selectedId: string;
  error: HttpErrorResponse;
  closeResult = '';
  form: FormGroup;
  roles: Array<User.RoleEnum>;
  roleUser: boolean;

  headElements = ['Id', 'Firstname', 'Lastname', 'Email', 'Role', 'Actions'];
  public page = 1;
  public pageSize = 10;
  constructor(private userService: UserService, private route: ActivatedRoute,
              config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) {
    config.backdrop = 'static';   // schliesst nicht, wenn man in das Fenster dahinter klickt
    config.keyboard = false;
    // Formular fuer delete
    this.form = this.fb.group(
      {
        id: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        role: ['', Validators.required],
      }
    );
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.setUsers();
  }
  readOne(id: string): void {
    this.userService.show(id).subscribe(
      (response: User) => this.user = response,
      error => this.error = error,
    );
  }
  deleteOne(id: string): void {
    this.userService.delete(id).subscribe(u => this.setUsers());
    window.location.reload();
  }

  open(content, id: string): void {
    this.readOne(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      if (result === 'delete')
      {
        this.deleteOne(this.user?.id);
      }
    });
  }
  openUserRole(content, id: string): void {
    this.readOne(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-UserRole'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      if (result === 'delete')
      {
        this.deleteOne(this.user?.id);
      }
    });
  }
  isSuperAdmin(userRole: User.RoleEnum): boolean {
    if (userRole === RoleEnum.superAdmin)
    {
      return true;
    }
  }
  isAdmin(userRole: User.RoleEnum): boolean {
    if (userRole === RoleEnum.admin)
    {
      return true;
    }
  }
  isUser(userRole: User.RoleEnum): boolean {
    if (userRole === RoleEnum.user)
    {
      return true;
    }
  }
  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
  }
  changeRole(userRole: User): void {
    //userRole.role = RoleEnum.user;
    this.user = userRole;
    this.userService.update(this.user).subscribe(u => this.setUsers());
  }
  changeRoleAsUser(userRole: User): void {
    // userRole.role = RoleEnum.user;
    this.user = userRole;
    this.userService.update(this.user).subscribe(u => this.setUsers());
  }
  // tslint:disable-next-line:typedef
  changeRoleAsAdmin(user: User){
    user.role = RoleEnum.admin;
    // this.user = userRole;
    this.userService.update(user).subscribe(u => this.setUsers());
  }
  // tslint:disable-next-line:typedef
  changeRoleAsSuperAdmin(userRole: User){
    userRole.role = RoleEnum.superAdmin;
    this.userService.update(userRole).subscribe(u => this.setUsers());
  }
  private setUsers(): void {
    this.userService.getAll().subscribe(u => {
      this.userList = u as User[];
    });
  }
}
