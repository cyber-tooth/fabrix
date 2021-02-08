import { Component, OnInit } from '@angular/core';
import {AuthorisationService, MaterialService} from '../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Material, User} from '../../models';
import {faChevronCircleLeft, faPlus, faUserMinus} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import RoleEnum = User.RoleEnum;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  faUserMinusIcon = faUserMinus;
  faPlusIcon = faPlus;
  faChevronCircleLeftIcon = faChevronCircleLeft;

  materialList: Array<Material> = [];
  selectedMaterial: Material;

  materialForm: FormGroup;
  materialFormSubmitAttempt: boolean;

  headElements = ['Id', 'name', 'material composition', 'product group', 'weight', 'surface look', 'thickness', 'commercial fabric name', 'Actions'];
  limit = 12;
  offset = 1;
  count = 0;

  closeResult = '';
  error: HttpErrorResponse;
  constructor(private materialService: MaterialService,
              private authorisationService: AuthorisationService,
              private router: Router,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private fB: FormBuilder) {
    // Konfiguration des modalen Dialogs
    config.backdrop = 'static';   // schliesst nicht, wenn man in das Fenster dahinter klickt
    config.keyboard = false;      // Modaler Dialog kann nicht durch ESC beendet werden
    // Formular fuer delete
    this.materialForm = this.fB.group(
      {
        idControl: ['', Validators.required],
        firstNameControl: ['', Validators.required],
        lastNameControl: ['', Validators.required],
        emailControl: ['', Validators.required],
      }
    );
  }


  ngOnInit(): void {
    this.getMaterialData();
  }

  getMaterialData(): void {
    const params = {
      limit: this.limit,
      offset: this.offset,
      count: this.count,
      filters: {}
    };
    this.materialService.getAll(params).subscribe((res) => {
      this.materialList = res.rows as Material[];
      this.count = res.count;
    });
  }

  hasAccess(roles) {
    return this.authorisationService.hasAccess(roles);
  }

  // hier noch material.name nach hinzugefügte person ändern..
  adminAdded(material: Material): boolean {
    if (material.createdBy === 'RoleEnum.admin')
    {
      return true;
    }
  }

  addMaterial(material: Material) {
    this.materialService.create(material).subscribe(u => this.setMaterials());
  }

  readOne(id: string): void {
    this.materialService.getDataById(id).subscribe(
      (response: Material) => this.selectedMaterial = response,
      error => this.error = error,
    );
  }

  deleteOne(id: string): void {
    this.materialService.delete(id);
    window.location.reload();
  }

  open(content, id: string): void {
    this.readOne(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      if (result === 'delete')
      {
        this.deleteOne(this.selectedMaterial.id);
      }
    });
  }

  handlePageChange(event) {
    this.offset = event;
    if ( this.offset === 1){
      this.count = 0;
    }
    this.getMaterialData();
  }

  private setMaterials(): void {
    this.materialService.getAll({}).subscribe(m => {
      this.materialList = m;
    });
  }

}
