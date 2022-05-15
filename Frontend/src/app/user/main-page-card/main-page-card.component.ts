import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-card',
  templateUrl: './main-page-card.component.html',
  styleUrls: ['./main-page-card.component.css'],
})
export class MainPageCardComponent implements OnInit {
  @Input() title = '';
  @Input() icon = 'pi-map-marker';
  @Input() active = false;
  constructor() {}

  ngOnInit(): void {}
}
