import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';

import {Options} from '@angular-slider/ngx-slider';
import {AuthenticationService, AuthorisationService, CategoriesServices, MaterialService} from '../../services';
import {Category} from '../../models/category';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import {Material} from '../../models';
import {appConfig} from '../../app.config';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

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
  categoriesAreFetched = false;
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
  categories = [];
  constructor(private categoriesServices: CategoriesServices,
              private modalService: BsModalService,
              private materialService: MaterialService,
              private authenticationService: AuthenticationService,
              private authorisationService: AuthorisationService) {
  }

  ngOnInit(): void {
    this.getMaterials();
    this.getCategories();
  }

  getCategories(category = null) {
    const categoryId = category ? category.id : null;

    this.categoriesServices.getCategories(categoryId).subscribe(
      data => {
        console.log('categories', data);

        for (const cat of data) {
          if (cat.minDegree && cat.maxDegree) {
            cat.minDegreeSelected = cat.minDegree;
            cat.maxDegreeSelected = cat.maxDegree;
          }
        }

        if (category) {
          category.children = data;
        } else {
          this.categories = data;
        }
      },
      error => {
        console.log('categories error', error);
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
        console.log('-> data', data);
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
      children => {
        this.selectedMaterial.children = children;
        console.log('-> this.selectedMaterial', this.selectedMaterial);
      },
    );
  }

  select(category: Category) {
    if (this.filters[category.id] !== undefined) {
      delete this.filters[category.id];
    } else {
      this.filters[category.id] = null;
      if (category.childrenCount && !category.children) {
        this.getCategories(category);
      }
      // Unselect parent category
      if (category.parent) {
        delete this.filters[category.parent];
      }
    }
    this.filtersChanged = true;
    this.getMaterials();
  }

  setValues(category: Category) {
    this.filters[category.id] = [category.minDegreeSelected, category.maxDegreeSelected];
    console.log('filters changed', this.filters[category.id]);
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
  hasAccess(roles)
  {
    return this.authorisationService.hasAccess(roles);
  }
}
