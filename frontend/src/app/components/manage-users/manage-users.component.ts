import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services";
import {User} from "../../models";
import RoleEnum = User.RoleEnum;
import {faChevronCircleLeft, faUserMinus} from "@fortawesome/free-solid-svg-icons";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";

@Component({
  selector: 'htw-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})

export class ManageUsersComponent implements OnInit {
  faUserMinusIcon = faUserMinus;
  faChevronCircleLeftIcon = faChevronCircleLeft;

  userList: Array<User> = [];
  headElements = ['Id', 'Firstname', 'Email', 'Role', 'Actions'];
  public page =1;
  public pageSize =10;
  constructor(private userService: UserService, private modalService: NgbModal) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.userList = users;
      //  this.setUsers()
    });
  }

  // tslint:disable-next-line:typedef
 getUserData(){
   this.userService.getAll().subscribe((res) => {
     this.userList = res as User[];
     //TODO this line should be deleted just for debugging
     console.log('userList', this.userList);
   });
 }

  // tslint:disable-next-line:typedef
  changeRoleAsUser(user: User){
    user.role = RoleEnum.user;
    this.userService.update(user).subscribe(u => this.setUsers());
  }
  // tslint:disable-next-line:typedef
  changeRoleAsAdmin(user: User){
    user.role = RoleEnum.admin;
    this.userService.update(user).subscribe(u => this.setUsers());
  }
  // tslint:disable-next-line:typedef
  changeRoleAsSuperAdmin(user: User){
    console.log(user);
    user.role = RoleEnum.superAdmin;
    this.userService.update(user).subscribe(u => this.setUsers());
  }

  // tslint:disable-next-line:typedef
  deleteUser(user: User) {

    const ref = this.modalService.open(DeleteModalComponent, { centered: true });
    ref.componentInstance.selectedUser = user;

    ref.result.then((ok) => {
        console.log("Ok Click");
      },
      (cancel) => {
        console.log("Cancel Click");

      });

   // console.log(user);
  }

  // tslint:disable-next-line:typedef
  private setUsers(){
    this.userService.getAll().subscribe(u => {
      this.userList = u;
    });
  }
}
