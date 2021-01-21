import {MaterialComposition} from './MaterialComposition';
import {SurfaceLook} from './SurfaceLook';
import {MaterialSubCategory} from './MaterialSubCategory';

export class MaterialMainCategory {
  id: string;
  categoryName: string;
  degree: string;
  threeDProgramm: string;
  thickness: string;
  materialCompositions: Array<MaterialComposition>;
  surfaceLooks: Array<SurfaceLook>;
  weight: string;
  productGroups: string[];
  subCategories: Array<MaterialSubCategory>;
}
