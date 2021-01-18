
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Material} from '../../models';
import {MaterialService} from '../../services/material.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
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

      }
    );
    this.material = {
      id: '', name: '', MATERIAL_COMPOSITION_NAME: '', productGroup: '', weight: '', surfaceLook: '',
      thickness: '', commercialFabricName: ''
    };
  }


  form: FormGroup;
  material: { surfaceLook: string; commercialFabricName: string; productGroup: string; thickness: string; name: string;
                MATERIAL_COMPOSITION_NAME: string; weight: string; id: string };

  urls = [];


  ngOnInit(): void {
  }


  onSubmit(): void {
    console.warn(this.form.value);
    const values = this.form.value;
    this.material.name = values.nameControl;
    this.material.MATERIAL_COMPOSITION_NAME = values.materialCompositionControl;
    this.material.productGroup = values.productGroupControl;
    this.material.weight = values.weigthtControl;
    this.material.surfaceLook = values.surfaceLookControl;
    this.material.thickness = values.thicknessControl;
    this.material.commercialFabricName = values.commercialFabricNameControl;


    console.log(this.material);
    this.cs.create(this.material);
    this.router.navigate(['/edit-material']);

  }

  selectFiles(event) {
    if (event.target.files) {
      for (let i = 0; i < File.length; i++) {
        const reader = new FileReader();

        reader.readAsDataURL(event.target.files[i]);

        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        };
      }
    }
  }
  open(){

  }
  cancel(): void {
    this.router.navigate(['/edit-material']);
  }
}
