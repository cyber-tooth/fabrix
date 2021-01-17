export class Material {
  id: string;
  name: string;
  CREATED_BY: string;
  CATEGORY_NAME: string;
  MATERIAL_COMPOSITION_ID: string;
  MATERIAL_COMPOSITION_NAME: string;
  commercialFabricName: string;
  thickness: string;
  surfaceLook: string;
  weight: string;
  productGroup: string;
  CATEGORY_ID: string;
  degree: string;
  url: string;


  constructor(id: string, name: string, CREATED_BY: string, CATEGORY_NAME: string,
              MATERIAL_COMPOSITION_ID: string, MATERIAL_COMPOSITION_NAME: string, surfaceLook: string,
              commercialFabricName: string, weight: string, productGroup: string,
              thickness: string, CATEGORY_ID: string, degree: string, url: string) {
  this.id = id;
  this.name = name;
  this.CREATED_BY = CREATED_BY;
  this.CATEGORY_NAME = CATEGORY_NAME;
  this.MATERIAL_COMPOSITION_ID = MATERIAL_COMPOSITION_ID;
  this.MATERIAL_COMPOSITION_NAME = MATERIAL_COMPOSITION_NAME;
  this.commercialFabricName = commercialFabricName;
  this.thickness = thickness;
  this.weight = weight;
  this.productGroup = productGroup;
  this.surfaceLook = surfaceLook;
  this.CATEGORY_ID = CATEGORY_ID;
  this.degree = degree;
  this.url = url;
  }

}
// tslint:disable-next-line:no-namespace
export namespace Material {
}

