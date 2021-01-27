export class Material {
  id: string;
  name: string;
  CREATED_BY: string;
  mainCategory: [
    CATEGORY_ID: string,
    categoryName: string,
    degree: string,
    child: {
      materialComposition: {
        materialCompositionName: string,
        child: {
          naturalMaterial: {
            cotton: string,
            cashmere: string,
            wool: string
          },
          syntheticFibre: string,
          other: {
            transparent: string;
            semiTrans: string;
            opaque: string;
          }
        }
      },
      weight: string,
      elasticity: {
        gesamtDehnungMittelwert: string
      }
    ];
  subCategory: [
      CATEGORY_ID: string,
      categoryName: string,
      degree: string,
      child: {
        opacity: string
      }
    ];

  constructor( ) {

  }
}

export namespace Material {
}

