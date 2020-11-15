import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'htw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  text = 'Additional Info-Text on our Info Box! 🎊';
  hidden = true;

  constructor() { }

  ngOnInit() {}

}
