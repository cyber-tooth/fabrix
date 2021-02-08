import {Category} from './category';
import {Image} from './image';

export class Material {
  id: string;
  name: string;
  // tslint:disable-next-line:variable-name
  created_by: string;
  createdAt: string;
  consistsOf: [
    {
      category: Category,
      degree: number
    }];
  images: [
    {
      url: string;
      name: string;
    }
  ];

  // tslint:disable-next-line:variable-name
  constructor(id: string, name: string, created_by: string, consistsOf: [{category: Category, degree: number}], images: [{url: string, name: string}]) {
    this.id = id;
    this.name = name;
    this.created_by = created_by;
    this.consistsOf = consistsOf;
    this.images = images;
  }
}

// tslint:disable-next-line:no-namespace
export namespace Material {
}

/*
loop material in materials
   print material.id
   print material.name
   loop consistsOf in material.consistsOf
      print prop.category.categoryName
           if (prop.category.categoryName === 'addational')
              extra behaviour
      print prop.degree*/
