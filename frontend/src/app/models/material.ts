import {Category} from './category';
import {Image} from './image';

export class Material {
  id: string;
  name: string;
  createdBy: string;
  images: Array<Image>;
  children: Array<Category>;

  constructor(id: string, name: string, createdBy: string, consistsOf: [{category: Category, degree: number}], images: Image []) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
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
