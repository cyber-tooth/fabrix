import { Component, OnInit } from '@angular/core';
import {User} from "../../models";
import {UserService} from "../../services";

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  userList: Array<User> = [];

  headElements = ['Id', 'Firstname', 'Email', 'Role for', 'Actions'];
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


  editMaterial(user: User){

  }

  deleteMaterial(user: User) {
    console.log(user);
    this.userService.delete(user.id).subscribe(u => this.setUsers());
  }

  private setUsers(){
    this.userService.getAll().subscribe(u =>{
      this.userList = u;
    })
  }

}
