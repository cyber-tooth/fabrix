import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption} from 'angular-2-dropdown-multiselect';

import {Options} from '@angular-slider/ngx-slider';
import {CategoriesServices} from '../../services';
import {Category} from '../../models/category';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";

// https://github.com/angular-slider/ngx-slider

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }],
  styles: [`
    .card.disabled {
      opacity: 0.5;
    }
  `]
})
export class MaterialComponent implements OnInit {

  public mainCategories: Category[] = [];

  value = 0;
  highValue = 100;
  categoriesAreFetched = false;
  Weightoptions: Options = {
    floor: 0,
    ceil: 100
  };

  constructor(private categoriesServices: CategoriesServices) {
  }

  ngOnInit(): void {
    this.categoriesServices.getMainCategories().subscribe(
      data => {
        this.mainCategories = data;
        this.mainCategories.forEach((element, index, array) => {

          this.categoriesServices.getChildCategories(element.id).subscribe(
            childern => {
              element.children = childern;
              element.children.forEach(item => {
                if (item.hasDegree) {
                  item.minDegree = 0;
                  item.maxDegree = 100;
                }
              });
            },
            error => {
            });
          if (index === (array.length - 1)) {
            this.categoriesAreFetched = true;
            console.log( this.mainCategories);
          }
        });
      },
      error => {
        console.log(error);
      });
  }

  getMaterials() {

  }

  select(category: Category) {
    category.selected = !category.selected;
  }

}
