import { Component, OnInit } from '@angular/core';
import {Material} from "../../models";

@Component({
  selector: 'app-materialcard-list',
  templateUrl: './materialcard-list.component.html',
  styleUrls: ['./materialcard-list.component.css']
})
export class MaterialcardListComponent implements OnInit {
  material: Material;
  constructor() { }

  ngOnInit(): void {
  }

}
