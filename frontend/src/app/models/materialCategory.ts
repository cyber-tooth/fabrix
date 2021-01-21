import {MaterialMainCategory} from './materialMainCategory';
import {MaterialSubCategory} from './materialSubCategory';
import {AdditionalInfo} from './additionalInfo';

export class MaterialCategory {
  mainCategories: Array<MaterialMainCategory>;
  subCategories: Array<MaterialSubCategory>;
  additionalInfos: Array<AdditionalInfo>;
}
