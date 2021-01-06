
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Stoffe} from '../../models';
import {StoffeService} from '../../services/stoffe.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(
    private cs: StoffeService,
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
        weigthtControl: ['', Validators.required],
        surfaceLookControl: ['', Validators.required],
        thicknessControl: ['', Validators.required],
        commercialFabricNameControl: ['', Validators.required],

      }
    );
    this.material = {
      id: '', name: '', materialComposition: '', productGroup: '', weigtht: '', surfaceLook: '',
      thickness: '', commercialFabricName: ''
    };
  }

  form: FormGroup;
  material: Stoffe;


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
  fileProgress(fileInput: any) {
    this.fileData = (fileInput.target.files[0] as File);
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

  cancel(): void {
    this.router.navigate(['/edit-material']);
  }
}
