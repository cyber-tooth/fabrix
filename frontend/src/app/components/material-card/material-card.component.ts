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

  // its just list data from here down
  public list = [
    {
      title: 'childless',
      children: []
    },
    {
      title: 'great grandparent',
      children: [
        {
          title: 'childless grandsibiling',
          children: []
        },
        {
          title: 'grandparent',
          children: [
            {
              title: 'childless sibiling',
              children: []
            },
            {
              title: 'another childless sibiling',
              children: []
            },
            {
              title: 'parent',
              children: [
                {
                  title: 'child',
                  children: []
                },
                {
                  title: 'another child',
                  children: []
                },
              ]
            },
            {
              title: 'another parent',
              children: [
                {
                  title: 'child',
                  children: []
                },
              ]
            },
          ]
        },
        {
          title: 'another grandparent',
          children: [
            {
              title: 'parent',
              children: [
                {
                  title: 'child',
                  children: []
                },
                {
                  title: 'another child',
                  children: []
                },
                {
                  title: 'a third child',
                  children: []
                },
                {
                  title: 'teen mother',
                  children: [
                    {
                      title: 'accident',
                      children: []
                    },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
  ];

  constructor(private route: ActivatedRoute, private materialService: MaterialService, private categoryService: CategoriesServices) { }

  ngOnInit(): void {
    this.selectedId = String(this.route.snapshot.paramMap.get('id'));
    this.readOneMaterial(this.selectedId);
  }

  readOneMaterial(id: string): void {
    this.materialService.getDataById(id).subscribe(
      material => {
        console.log("-> readOneMaterial --> material", material);
        this.selectedMaterial = material;
      },
      error => console.log(error)
    );
    console.log("hier das material: "+ this.selectedMaterial);
  }
}
