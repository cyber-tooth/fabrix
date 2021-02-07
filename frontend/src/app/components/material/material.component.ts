import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {Options} from '@angular-slider/ngx-slider';
import {CategoriesServices, MaterialService} from '../../services';
import {Category} from '../../models/category';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import {Material} from '../../models';

// https://github.com/angular-slider/ngx-slider

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: BsDropdownConfig, useValue: {autoClose: false}}],
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

  filters = {};
  limit = 12;
  offset = 0;
  materials: Material[] = [];
  total: any;

  constructor(private categoriesServices: CategoriesServices,
              private materialService: MaterialService) {
  }

  ngOnInit(): void {
    this.getMaterials();
    this.getCategories();
  }

  getCategories() {
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
          }
        });
      },
      error => {
        console.log(error);
      });
  }

  getMaterials() {
    const params = {
      limit: this.limit,
      offset: this.offset,
      filters: this.filters
    };
    console.log('filters', this.filters);

    this.materialService.getAll(params).subscribe(
      response => {
        const {materials, total} = response;
        this.materials = materials;
        this.total = total;
        this.materials = [];
        console.log('materials',  response);
      }, error => {
        console.log('error', error);
      });
  }

  select(category: Category) {
    category.selected = !category.selected;
    if (category.selected) {
      this.filters[category.id] = null;
    } else if (!category.selected) {
      delete this.filters[category.id];
    }
    this.getMaterials();
  }

  setValues(category: Category) {
    this.filters[category.id] = [category.minDegree, category.maxDegree];
    this.getMaterials();
  }

  handlePageChange(event) {
    this.offset = event;
    this.getMaterials();
  }

}
