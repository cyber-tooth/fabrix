import {Component, Input, OnInit} from '@angular/core';
import {Stoffe} from "../../models";
import {ActivatedRoute} from "@angular/router";
import {StoffeService} from "../../services";

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.css']
})
export class MaterialCardComponent implements OnInit {
  selectedMaterial: Stoffe;
  selectedId: string;

  constructor(private route: ActivatedRoute, private sS: StoffeService) { }

  ngOnInit(): void {
    this.selectedId = String(this.route.snapshot.paramMap.get('id'));
    this.readOne(this.selectedId);
  }
  readOne(id: string): void {
    this.sS.getDataById(id).subscribe(
      (response: Stoffe) => this.selectedMaterial = response,
      error => console.log(error)
    );
  }
}
