export class Stoffe{
  id: string;
  name: string;
  materialComposition; string;
  productGroup: string;
  weigtht: string;
  surfaceLook: string;
  thickness: string;
  commercialFabricName: string;

  constructor( id: string, name: string, materialComposition: string, productGroup: string, weigtht: string, thickness: string, surfaceLook: string, commercialFabricName: string) {
  this.id = id;
  this.name = name;
  this.materialComposition = materialComposition;
  this.productGroup = productGroup;
  this.weigtht = weigtht;
  this.surfaceLook = surfaceLook;
  this.thickness = thickness;
  this.commercialFabricName = commercialFabricName;
  }

}

export namespace Stoffe{

}
