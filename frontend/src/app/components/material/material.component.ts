import { Component, OnInit } from '@angular/core';
import {IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption} from 'angular-2-dropdown-multiselect';

import { Options } from '@angular-slider/ngx-slider';
// https://github.com/angular-slider/ngx-slider

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  optionsModel1: number[];
  optionsModel2: number[];
  optionsModel3: number[];
  optionsModel4: number[];
  optionsModel5: number[];
  optionsModel6: number[];

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-dark',
    dynamicTitleMaxItems: 3,
    showCheckAll: true,
    showUncheckAll: true,
    displayAllSelectedText: false
  };

  // Text configuration
  textSetting1: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Material composition',
    allSelected: 'All selected',

  };

  textSetting2: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: '3D-Program',
    allSelected: 'All selected',

  };

  textSetting3: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Product Group',
    allSelected: 'All selected',

  };

  textSetting4: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Surface Look',
    allSelected: 'All selected',

  };

  textSetting5: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Commercial Fabric Name',
    allSelected: 'All selected',

  };



  myOptions1: IMultiSelectOption[] = [
    { id: 1, name: 'Natural Fibre', isLabel: true },
    { id: 2, name: 'Alpaca', parentId: 1 },
    { id: 3, name: 'Casein', parentId: 1 },
    { id: 4, name: 'Cashmere', parentId: 1 },
    { id: 5, name: 'Cotton', parentId: 1 },
    { id: 6, name: 'Fur', parentId: 1 },
    { id: 7, name: 'Hemp', parentId: 1 },
    { id: 8, name: 'Jute', parentId: 1 },
    { id: 9, name: 'Leather', parentId: 1 },
    { id: 10, name: 'Linen', parentId: 1 },
    { id: 11, name: 'Lyocell', parentId: 1 },
    { id: 12, name: 'Modal', parentId: 1 },
    { id: 13, name: 'Mohair', parentId: 1 },
    { id: 14, name: 'Ramie', parentId: 1 },
    { id: 15, name: 'Silk', parentId: 1 },
    { id: 16, name: 'Soy', parentId: 1 },
    { id: 17, name: 'Viscose', parentId: 1 },
    { id: 18, name: 'Wool (sheep)', parentId: 1 },
    { id: 19, name: 'Synthetic Fibre', isLabel: true },
    { id: 20, name: 'Elastane', parentId: 19 },
    { id: 21, name: 'Elastolefin', parentId: 19 },
    { id: 22, name: 'Polyacrylic', parentId: 19 },
    { id: 23, name: 'Polyamide', parentId: 19 },
    { id: 24, name: 'Polyester', parentId: 19 },
    { id: 25, name: 'Other', isLabel: true },
    { id: 26, name: 'Aramid', parentId: 25 },
    { id: 27, name: 'Glas', parentId: 25 },

  ];

  myOptions2: IMultiSelectOption[] = [
    { id: 1, name: 'Lectra Modalis' },
    { id: 3, name: 'Assyst Vidya'},
    { id: 4, name: 'CLO3D' },
    { id: 5, name: 'Browzwear VStitcher' }

  ];

  myOptions3: IMultiSelectOption[] = [
    { id: 1, name: 'Accessoires'},
    { id: 2, name: 'Beachwear'},
    { id: 3, name: 'Berufsbekleidung/ PSA'},
    { id: 4, name: 'Business Wear'},
    { id: 5, name: 'Casual Wear'},
    { id: 6, name: 'Costumes/ Traditional'},
    { id: 7, name: 'Outer Wear'},
    { id: 8, name: 'Sleepwear/ Loungewear'},
    { id: 9, name: 'Sportswear'},
    { id: 10, name: 'Underwear', }
  ];

  myOptions4: IMultiSelectOption[] = [
    { id: 1, name: 'Weave', isLabel: true },
    { id: 2, name: 'Plain Weave', parentId: 1 },
    { id: 3, name: 'Twill Weave', parentId: 1 },
    { id: 4, name: 'Satin Weave', parentId: 1 },
    { id: 5, name: 'Jacquard Weave', parentId: 1 },
    { id: 6, name: 'Knit', isLabel: true },
    { id: 7, name: 'Circular Knit', parentId: 6 },
    { id: 8, name: 'Flat Knit', parentId: 6 },
    { id: 9, name: 'Warp Knit', parentId: 6 },
    { id: 10, name: 'Cuff Material', parentId: 6 },
    { id: 11, name: 'Non-Woven', }

  ];

  myOptions5: IMultiSelectOption[] = [
    { id: 1, name: 'Chenille'},
    { id: 2, name: 'Corduroy'},
    { id: 3, name: 'Crêpe'},
    { id: 4, name: 'Denim'},
    { id: 5, name: 'Flannel'},
    { id: 6, name: 'Lace'},
    { id: 7, name: 'Plissé'},
    { id: 8, name: 'Plush'},
    { id: 9, name: 'Rib'},
    { id: 10, name: 'Sersucker'},
    { id: 10, name: 'Terry'},
    { id: 10, name: 'Velvet'},
    { id: 10, name: 'Velour'},
    { id: 10, name: 'Other'}
  ];


  WeightValue = 0;
  WeightHighValue = 100;
  Weightoptions: Options = {
    floor: 0,
    ceil: 100
  };
  ThicknessValue = 0;
  ThicknessHighValue = 100;
  Thicknessoptions: Options = {
    floor: 0,
    ceil: 100
  };
  DrapeCoefficientValue = 0;
  DrapeCoefficientHighValue = 100;
  DrapeCoefficientoptions: Options = {
    floor: 0,
    ceil: 100
  };
  ElasticityValue = 0;
  ElasticityHighValue = 100;
  Elasticityoptions: Options = {
    floor: 0,
    ceil: 100
  };
  ElongationValue = 0;
  ElongationHighValue = 100;
  Elongationoptions: Options = {
    floor: 0,
    ceil: 100
  };

  constructor() {
  }

  ngOnInit(): void {
  }


  onChange($event: any) {
    console.log(this.optionsModel1);
    console.log(this.optionsModel2);
    console.log(this.optionsModel3);
    console.log(this.optionsModel4);
    console.log(this.optionsModel5);

  }

  change1() {
  }
}
