import {NumberThreadsUnitLength} from "./numberThreadsUnitLength";
import {StitchesPerUnitLength} from "./stitchesPerUnitLength";

export class AdditionalInfo {
  abrasionResistance: string;
  burstPressure: string;
  careInstructions: string;
  density: string;
  electricalCharge: string;
  finishing: string;
  pilling: string;
  shrinkage: string;
  sustainability: string;
  tensileStrength: string;
  offerer: string;
  numberThreadsUnitLengths: Array<NumberThreadsUnitLength>;
  stitchesPerUnitLengths: Array<StitchesPerUnitLength>;
}
