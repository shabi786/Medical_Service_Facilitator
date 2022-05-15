import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-card',
  templateUrl: './main-page-card.component.html',
  styleUrls: ['./main-page-card.component.css'],
})
export class MainPageCardComponent implements OnInit {
  @Input() imageSrc = 'hospital.jpg';
  @Input() title = 'Sample Title';
  constructor() {}

  ngOnInit(): void {}
}
