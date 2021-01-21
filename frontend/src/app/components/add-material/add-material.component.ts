
import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Material} from '../../models';
import {MaterialService} from '../../services/material.service';
import {HttpClient} from '@angular/common/http';
import {getUrlScheme} from "@angular/compiler";
import {url} from "inspector";

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit, OnChanges {
  material: Material;
  form: FormGroup;
  urls = [];
  optionProductGroup: string[];
  selectedOProductGroup: string;
  optionMaterialComposition: string[];
  selectedOMaterialComposition: string;

  constructor(
    private cs: MaterialService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group(
      {
        nameControl: ['', Validators.required],
        materialCompositionControl: ['', Validators.required],
        productGroupControl: ['', Validators.required],
        weightControl: ['', Validators.required],
        surfaceLookControl: ['', Validators.required],
        thicknessControl: ['', Validators.required],
        commercialFabricNameControl: ['', Validators.required],
        urlsControl: ['', Validators.required],
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit(): void{
    this.getOptionProductGroup();
  }

  onSubmit(): void {
    console.warn(this.form.value);
    const values = this.form.value;
    this.material.name = values.nameControl;
    this.material.categories[0][3][0] = values.materialCompositionControl;
    this.material.categories = values.productGroupControl;
    this.material.categories[0][7] = values.weigthtControl;
    // wie sollen wir hier die material-daten aufrufen am besten? mit array[] zu kompliziert geht es einfacher?
   // this.material.surfaceLook = values.surfaceLookControl;
   // this.material.thickness = values.thicknessControl;
   // this.material.commercialFabricName = values.commercialFabricNameControl;
   // this.material.urls = values.urlsControl;

    console.log("aktuell Material" + this.material);
    this.cs.create(this.material);
    console.log("neue Material:" + this.material);
    this.router.navigate(['/edit-material']);
  }
  getOptionProductGroup(){
    this.optionProductGroup = [
      'Accessoires',
      'Beachwear',
      'Berufsbekleidung/ PSA',
      'Business Wear',
      'Casual Wear',
      'Costumes/ Traditional',
      'Outer Wear',
      'Sleepwear/ Loungewear',
      'Sportswear',
      'Underwear'
    ];
    this.selectedOProductGroup = this.optionProductGroup[0];
  }
  getOptionMaterialComposition() {
    this.optionMaterialComposition = [
      'Natural Material',
      'Synthetic fibre',
    ];
    this.selectedOMaterialComposition = this.optionMaterialComposition[0];
    if (this.selectedOMaterialComposition === this.optionMaterialComposition[0]){
      this.getNaturalMaterial();
    }
    if (this.selectedOMaterialComposition === this.optionMaterialComposition[1]){
        this.getSyntheticFibre();
    }
  }
  getNaturalMaterial(){

  }
  getSyntheticFibre(){

  }

  selectFiles(event) {
    if (event.target.files) {
      for (let i = 0; i < File.length; i++) {
        const reader = new FileReader();

        reader.readAsDataURL(event.target.files[i]);

        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
          console.log(this.urls)
        };
      }
    }
  }
  open() {
  }
  cancel(): void {
    this.router.navigate(['/edit-material']);
  }
}
