import {Component, Input, OnInit} from '@angular/core';
import {Material} from "../../models";

@Component({
  selector: 'app-materialcard-item',
  templateUrl: './materialcard-item.component.html',
  styleUrls: ['./materialcard-item.component.css']
})
export class MaterialcardItemComponent implements OnInit {
  @Input() material: Material;
  constructor() { }

  ngOnInit(): void {
  }

}
