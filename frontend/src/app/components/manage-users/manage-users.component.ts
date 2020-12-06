import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../services";
import {User} from "../../models";
import RoleEnum = User.RoleEnum;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})

export class ManageUsersComponent implements OnInit {
  userList: Array<User> = [];

  headElements = ['Id', 'Firstname', 'Email', 'Role', 'Actions'];
  public page =1;
  public pageSize =10;
  constructor(private userService: UserService) {}

  ngOnInit() {
   // this.getUserData()
    this.setUsers()
  }

 // getUserData(){
 //   this.userService.getAll().subscribe((res) => {
 //     this.userList = res as User[];
 //   })
 // }

  changeRoleAsUser(user: User){
    user.role = RoleEnum.user;
    this.userService.update(user).subscribe(u => this.setUsers());
  }
  changeRoleAsAdmin(user: User){
    user.role = RoleEnum.admin;
    this.userService.update(user).subscribe(u => this.setUsers());
  }
  changeRoleAsSuperAdmin(user: User){
    console.log(user);
    user.role = RoleEnum.superAdmin;
    this.userService.update(user).subscribe(u => this.setUsers());
  }
  editUser(user: User){

  }

  deleteUser(user: User) {
    console.log(user);
    this.userService.delete(user.id).subscribe(u => this.setUsers());
  }

  private setUsers(){
    this.userService.getAll().subscribe(u =>{
      this.userList = u;
    })
  }
}
