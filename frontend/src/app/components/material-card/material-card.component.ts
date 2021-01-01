import {Component, Input, OnInit} from '@angular/core';
import {Stoffe} from "../../models";

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.css']
})
export class MaterialCardComponent implements OnInit {
  @Input() material: Stoffe;

  constructor() { }

  ngOnInit(): void {
  }

}
