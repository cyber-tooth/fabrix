import {Component, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../models";
import {UserService} from "../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventEmitter} from "events";


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @Input() user: User;
  @Output() deleteEvent = new EventEmitter<User>();
  userList: User[];
  selectedId: string;
  error: HttpErrorResponse;

  form: FormGroup;

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, private route: ActivatedRoute,
              private userService: UserService, private router: Router) { }


  ngOnInit(): void {
    this.selectedId = String(this.route.snapshot.paramMap.get('id'));
    if (this.selectedId === null) {
      this.readAll();
    }
    else {
      console.log('id = ' + this.selectedId);   // nur fuer debug
      this.readOne(this.selectedId);
    }
  }
  readAll(): void {
    this.userService.getAll().subscribe(
      (response: User[]) => {
        console.log(response);
        return this.userList = response;
      });
  }
  readOne(id: string): void {
    this.userService.show(id).subscribe(
      (response: User) => this.user = response,
      error => this.error = error,
    );
  }
  delete(user: User): void {
    this.user = user;
    this.userService.delete(this.user.id);
    this.router.navigateByUrl('/manage-users');
  }
}
