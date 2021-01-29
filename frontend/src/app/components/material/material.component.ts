import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption} from 'angular-2-dropdown-multiselect';

import {Options} from '@angular-slider/ngx-slider';
import {CategoriesServices} from '../../services';
import {Category} from "../../models/category";

// https://github.com/angular-slider/ngx-slider

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .card.disabled {
      opacity: 0.5;
    }
  `]
})
export class MaterialComponent implements OnInit {

  public mainCategories: Category[] = [];

  WeightValue = 0;
  WeightHighValue = 100;
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
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
