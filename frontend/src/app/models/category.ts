
export class Category {
  id: string;
  categoryName: string;
  hasDegree: boolean;
  degreeType: string;
  // tslint:disable-next-line:variable-name
  degree_title: string;
  parentCategory: Category;
  children: Array<Category>;
  childrenCount: number;
  minDegree: number;
  maxDegree: number;
  selected: boolean;
  minDegreeSelected: number;
  maxDegreeSelected: number;
  parent: number;
  constructor() {
  }

}
