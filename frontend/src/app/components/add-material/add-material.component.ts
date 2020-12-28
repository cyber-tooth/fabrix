
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Stoffe} from '../../models';
import {StoffeService} from '../../services/stoffe.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
  form: FormGroup;
  material: Stoffe;

  constructor(
    private cs: StoffeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        nameControl: ['', Validators.required],
        materialCompositionControl: ['', Validators.required],
        productGroupControl: ['', Validators.required],
        weigthtControl: ['', Validators.required],
        surfaceLookControl: ['', Validators.required],
        thicknessControl: ['', Validators.required],
        commercialFabricNameControl: ['', Validators.required],

      }
    );
    this.material = { id: '', name: '', materialComposition: '',  productGroup: '', weigtht: '', surfaceLook: '',
      thickness: '', commercialFabricName: ''};
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.form.value);
    const values = this.form.value;
    this.material.name = values.nameControl;
    this.material.materialComposition = values.materialCompositionControl;
    this.material.productGroup = values.productGroupControl;
    this.material.weigtht = values.weigthtControl;
    this.material.surfaceLook = values.surfaceLookControl;
    this.material.thickness = values.thicknessControl;
    this.material.commercialFabricName = values.commercialFabricNameControl;


    console.log(this.material);
    this.cs.create(this.material);
    this.router.navigate(['/edit-material']);
  }

  cancel(): void {
    this.router.navigate(['/edit-material']);
  }

}
