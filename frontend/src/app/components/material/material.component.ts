import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';

import {Options} from '@angular-slider/ngx-slider';
import {CategoriesServices, MaterialService} from '../../services';
import {Category} from '../../models/category';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import {Material} from '../../models';
import {appConfig} from '../../app.config';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

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

  mainCategories: Category[] = [];
  value = 0;
  highValue = 100;
  categoriesAreFetched = false;
  Weightoptions: Options = {
    floor: 0,
    ceil: 100
  };

  filters = {};
  filtersChanged = false;
  limit = 12;
  offset = 1;
  count = 0;
  total = 0;
  materials: Material[] = [];
  api = appConfig.apiUrl;
  modalRef: BsModalRef;
  selectedMaterial: Material;
  constructor(private categoriesServices: CategoriesServices,
              private modalService: BsModalService,
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
    if (this.filtersChanged){
      this.count = 0;
      this.offset = 1;
    }
    const params = {
      limit: this.limit,
      offset: this.offset,
      count: this.count,
      filters: this.filters
    };
    this.materialService.getAll(params).subscribe(
      data => {
        console.log("-> data", data);
        const {rows, count, pages} = data;
        this.materials = rows;
        this.count = count;
        this.total = pages;
        this.filtersChanged = false;
      }, error => {
      });
  }

  readOneMaterial(material): void {
    this.selectedMaterial = material;
    this.materialService.getDataById(material.id).subscribe(
      childern => {
        this.selectedMaterial.childern = childern;
        console.log("-> this.selectedMaterial", this.selectedMaterial);
      },
    );
  }

  select(category: Category) {
    category.selected = !category.selected;
    if (category.selected) {
      this.filters[category.id] = null;
    } else if (!category.selected) {
      delete this.filters[category.id];
    }
    this.filtersChanged = true;
    this.getMaterials();

  }

  setValues(category: Category) {
    this.filters[category.id] = [category.minDegree, category.maxDegree];
    if (category.minDegree === 0 && category.maxDegree === 99 || category.minDegree === 0 && category.maxDegree === 100) {
      delete this.filters[category.id];
    }
    this.filtersChanged = true;
    this.getMaterials();
  }

  handlePageChange(event) {
    this.offset = event;
    if ( this.offset === 1){
      this.count = 0;
    }
    this.getMaterials();
  }

  openModal(template: TemplateRef<any>, material) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl modal-dialog-centered'
    });
    this.readOneMaterial(material);
  }

  toArray(childern) {
    return Object.keys(childern).map((key) => childern[key]);
  }
}
