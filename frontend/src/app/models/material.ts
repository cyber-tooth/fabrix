export class Material {
  id: string;
  name: string;
  CREATED_BY: string;
  categories: [
      mainCategories: [
        CATEGORY_ID: string,
        categoryName: string,
        degree: string,
        materialComposition: [
          materialCompositionName: string,
          naturalMaterial: string,
          syntheticFibre: string,
          other: string
        ],
        threeDProgramm: string,
        thickness: string,
        surfaceLook: [
          weave: string,
          knit: string,
          nonWoven: string
        ],
        weight: string,
        productGroup: string[],
        subCategories: [
          opacity: string,
          drapeCoefficient: string,
          commercialFabricName: string
        ]
      ],
      subCategories: [
        opacity: string,
        drapeCoefficient: string,
        commercialFabricName: string,
        elasticity: [
          totalElongationMean: [
            longitudinal: string,
            cross: string
          ],
          remainingAfterRemoval: [
            longitudinal: string,
            cross: string
          ],
          remainingElongationAfterRecovery: [
            longitudinal: string,
            cross: string
          ]
        ],
        elongation: [
          fh_n_chain: string,
          fh_n_shots: string
        ]
      ],
    additionalInfo: [
      abrasionResistance: string,
      burstPressure: string,
      careInstructions: string,
      density: string,
      electricalCharge: string,
      finishing: string,
      pilling: string,
      shrinkage: string,
      sustainability: string,
      tensileStrength: string,
      offerer: string,
      numberThreadsUnitLength: [
        threads: string,
        weftThreads: string,
        warpThreads: string
      ],
      stitchesPerUnitLength: [
        meshes: string,
        wales: string,
        rowsStitches: string
      ]
    ]
  ];
  pictures: [
    url: string,
    title: string
  ];

  constructor(id: string, name: string,
              CREATED_BY: string,
              categories: [
                mainCategories: [
                  CATEGORY_ID: string,
                  categoryName: string,
                  degree: string,
                  materialComposition: [
                    materialCompositionName: string,
                    naturalMaterial: string,
                    syntheticFibre: string,
                    other: string
                  ],
                  threeDProgramm: string,
                  thickness: string,
                  surfaceLook: [
                    weave: string,
                    knit: string,
                    nonWoven: string
                  ],
                  weight: string,
                  productGroup: string[],
                  subCategories: [
                    opacity: string,
                    drapeCoefficient: string,
                    commercialFabricName: string
                  ]
                ],
                subCategories: [
                  opacity: string,
                  drapeCoefficient: string,
                  commercialFabricName: string,
                  elasticity: [
                    totalElongationMean: [
                      longitudinal: string,
                      cross: string
                    ],
                    remainingAfterRemoval: [
                      longitudinal: string,
                      cross: string
                    ],
                    remainingElongationAfterRecovery: [
                      longitudinal: string,
                      cross: string
                    ]
                  ],
                  elongation: [
                    fh_n_chain: string,
                    fh_n_shots: string
                  ]
                ],
                additionalInfo: [
                  abrasionResistance: string,
                  burstPressure: string,
                  careInstructions: string,
                  density: string,
                  electricalCharge: string,
                  finishing: string,
                  pilling: string,
                  shrinkage: string,
                  sustainability: string,
                  tensileStrength: string,
                  offerer: string,
                  numberThreadsUnitLength: [
                    threads: string,
                    weftThreads: string,
                    warpThreads: string
                  ],
                  stitchesPerUnitLength: [
                    meshes: string,
                    wales: string,
                    rowsStitches: string
                  ]
                ]
              ],
              pictures: [
                url: string,
                title: string
              ])
  {
    this.id = id;
    this.name = name;
    this.CREATED_BY = CREATED_BY;
    this.categories = categories;
    this.pictures = pictures;
  }
}
// tslint:disable-next-line:no-namespace
export namespace Material {
}

