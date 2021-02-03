import {Component, Input, OnInit} from '@angular/core';
import {Material} from "../../models";
import {ActivatedRoute} from "@angular/router";
import {MaterialService} from "../../services";

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.css']
})
export class MaterialCardComponent implements OnInit {
  materials: Material[];
  selectedMaterial: Material;
  selectedId: string;

  constructor(private route: ActivatedRoute, private sS: MaterialService) { }

  ngOnInit(): void {
    this.selectedId = String(this.route.snapshot.paramMap.get('id'));
    this.readOne(this.selectedId);
  }
  readOne(id: string): void {
    this.sS.getDataById(id).subscribe(
      (response: Material) => this.selectedMaterial = response,
      error => console.log(error)
    );
  }
}
