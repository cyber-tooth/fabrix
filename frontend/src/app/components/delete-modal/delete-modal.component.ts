import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../models";
import {UserService} from "../../services";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  userList: User[];
  selectedId: number;

  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private userService: UserService, private router: Router) { }


  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
  }

  readAll(): void {
    this.userService.getAll().subscribe(
      (response: User[]) => {
        console.log(response);
        return this.userList = response;
      });
  }
}
