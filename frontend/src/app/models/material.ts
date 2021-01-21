import {MaterialCategory} from './MaterialCategory';
import {Picture} from './picture';
export class Material {
  id: string;
  name: string;
  created_by: string;
  categories: Array<MaterialCategory>;
  pictures: Array<Picture>;
}

