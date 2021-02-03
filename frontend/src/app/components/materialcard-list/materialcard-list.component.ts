import { Component, OnInit } from '@angular/core';
import {Material, User} from "../../models";
import {MaterialService} from "../../services";

@Component({
  selector: 'app-materialcard-list',
  templateUrl: './materialcard-list.component.html',
  styleUrls: ['./materialcard-list.component.css']
})
export class MaterialcardListComponent implements OnInit {
  materials: Material[];
  constructor(private mS: MaterialService) { }

  ngOnInit(): void {
    this.getMaterials();
  }

  getMaterials() {
    this.mS.getAll().subscribe(u => {
      this.materials = u as Material[];
    });
  }
}
