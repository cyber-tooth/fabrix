import {Category} from './category';

export class Material {
  id: string;
  name: string;
  properties: [
    {
      category: Category,
      degree: number
    }];
  constructor() {}
}

// tslint:disable-next-line:no-namespace
export namespace Material {
}

/*
loop material in materials
   print material.id
   print material.name
   loop properties in material.properties
      print prop.category.categoryName
           if (prop.category.categoryName === 'addational')
              extra behaviour
      print prop.degree*/
