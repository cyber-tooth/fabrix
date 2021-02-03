
export class Category {
  id: string;
  categoryName: string;
  hasDegree: boolean;
  degreeType: string;
  degreeTitle: string;
  parentCategory: Category;
  children: Array<Category>;
  minDegree: number;
  maxDegree: number;
  selected: boolean;
  constructor() {
  }

}
