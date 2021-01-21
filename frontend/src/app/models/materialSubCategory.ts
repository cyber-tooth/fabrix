import {Elasticity} from './elasticity';
import {Elongation} from './elongation';

export class MaterialSubCategory {
  opacity: string;
  drapeCoefficient: string;
  commercialFabricName: string;
  elasticities: Array<Elasticity>;
  elongations: Array<Elongation>;
}
