import { Pipe, PipeTransform} from "@angular/core";
import { Material} from "../models";

@Pipe({name: 'materialFilter'})
export class SearchPipe implements PipeTransform {


  transform(materials: any[], searchTerm: string): any[] {
    if (!materials) {
      return [];
    }
    if (!searchTerm) {
      return materials;
    }
    searchTerm = searchTerm.toLocaleLowerCase();

    return materials.filter(it => {
      return it.toLocaleLowerCase().includes(searchTerm);
    });
  }

}
