import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MaterialService, UserService} from "../../services";
import {ActivatedRoute} from "@angular/router";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.css']
})
export class CreateCategoryModalComponent implements OnInit {
  optionsMainCategory: string[];
  selectedOptionMainCategory: string;
  optionsMaterialComposition: string[];
  selectedOptionMaterialComposition: string;
  form: FormGroup;

  constructor(private fb: FormBuilder, private mS: MaterialService,
              private route: ActivatedRoute,
              private config: NgbModalConfig,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.optionsMainCategory = [
      'MaterialComposition',
      'option 2',
      'option 3',
    ];
    this.selectedOptionMainCategory = this.optionsMainCategory[0];
    if (this.selectedOptionMaterialComposition === this.optionsMainCategory[0]){
      this.showMaterialComposition();
    }
    if (this.selectedOptionMaterialComposition === this.optionsMainCategory[1]){
      this.showMaterialComposition();
    }
  }
  showMaterialComposition() {
    this.optionsMaterialComposition = [
      'Natural Material',
      'Synthetic fibre',
      'other'
    ];
    this.selectedOptionMaterialComposition = this.optionsMaterialComposition[0];
  }
  open(content): void {
    /*
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      if (result === 'create')
      {
        this.deleteOne(this.member?.id);
      }
    });
    '/
     */
  }

}
