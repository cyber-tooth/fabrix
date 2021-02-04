import {Component, Input, OnInit} from '@angular/core';
import {Material} from "../../models";
import {ActivatedRoute} from "@angular/router";
import {CategoriesServices, MaterialService} from "../../services";
import {ImagesService} from "../../services/images.service";
import {Category} from "../../models/category";

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.css']
})
export class MaterialCardComponent implements OnInit {
  selectedMaterial: Material;
  selectedId: string;
 // imagesForSelectedMaterial: Image;
 // mainCategoryForSelectedMaterial: Category[];
 // childCategoryForSelectedMaterial: Category[];
  categoryTree: Category[];

  constructor(private route: ActivatedRoute, private sS: MaterialService, private categoryService: CategoriesServices) { }

  ngOnInit(): void {
    this.selectedId = String(this.route.snapshot.paramMap.get('id'));
    this.readOneMaterial(this.selectedId);
    this.readCategoryTree(this.selectedMaterial.id);
  }

  readOneMaterial(id: string): void {
    this.sS.getDataById(id).subscribe(
      (response: Material) => this.selectedMaterial = response,
      error => console.log(error)
    );
    console.log("hier das material: "+ this.selectedMaterial);
  }
  /*
  readMainCategories(id: string){
    this.categoryService.getMainCategories().subscribe(
      data => {
        this.mainCategoryForSelectedMaterial = data;
      });
    console.log("hier mainCategory: "+ this.mainCategoryForSelectedMaterial);
  }
  */
  readCategoryTree(id: string){
    this.sS.getCategoryTreeById(id).subscribe(
      data => {
        this.categoryTree = data;
      });
    console.log("hier catgeroyTree: " + this.categoryTree);
  }
  readOneImage(id: string){
  //  this.imagesService.getImageById(id); // hier folgt noch das object image
  }
}
