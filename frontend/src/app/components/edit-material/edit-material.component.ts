import { Component, OnInit } from '@angular/core';
import {StoffeService} from '../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Stoffe} from '../../models';
import {faPlus, faUserMinus} from "@fortawesome/free-solid-svg-icons";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  faUserMinusIcon = faUserMinus;
  faPlusIcon = faPlus;

  materialList: Array<Stoffe> = [];

  materialForm: FormGroup;
  materialFormSubmitAttempt: boolean;

  headElements = ['Id', 'name', 'material composition', 'product group', 'weight', 'surface look', 'thickness', 'commercial fabric name', 'Actions'];

  public page = 1;
  public pageSize = 10;

  constructor(private stoffeService: StoffeService,
              private form: FormBuilder) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getMaterialData();

    this.materialForm =
      this.form.group({
        email: [null, [Validators.required]],
        acceptTerms: [true],
        firstName: [null, [Validators.required as any]],
        lastName: [null, [Validators.required as any]],
      });

    this.materialFormSubmitAttempt = false;
  }

  // tslint:disable-next-line:typedef
  getMaterialData() {
    this.stoffeService.getAll().subscribe((res) => {
      this.materialList = res as Stoffe[];
      // TODO this line should be deleted just for debugging
      // console.log("userList", this.userList);
    });
  }

  // tslint:disable-next-line:typedef
  addMaterial(material: Stoffe) {
    this.stoffeService.create(material).subscribe(u => this.setMaterials());
  }
  // tslint:disable-next-line:typedef
  delete(material: Stoffe){

  }
  // tslint:disable-next-line:typedef
  private setMaterials() {
    this.stoffeService.getAll().subscribe(m => {
      this.materialList = m;
    });
  }

}
