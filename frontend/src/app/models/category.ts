
export class Category {
  id: string;
  categoryName: string;
  hasDegree: boolean;
  degreeType: string;
  // tslint:disable-next-line:variable-name
  degree_title: string;
  parentCategory: Category;
  children: Array<Category>;
  minDegree: number;
  maxDegree: number;
  selected: boolean;
  constructor() {
  }

}
