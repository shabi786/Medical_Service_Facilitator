import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  active = 0;
  constructor() {}
  getSvg() {
    switch (this.active) {
      case 0:
        return 'assets/images/navigation.svg';
      case 1:
        return 'assets/images/predict.svg';
      case 2:
        return 'assets/images/open.svg';
      default:
        return 'assets/images/closed.svg';
    }
  }
  getLink() {
    switch (this.active) {
      case 0:
        return '/hospitals';
      case 1:
        return '/disease';
      case 2:
        return '/appointment/open';
      default:
        return '/appointment/closed';
    }
  }
  getTitle() {
    switch (this.active) {
      case 0:
        return 'Find Hospitals near you';
      case 1:
        return 'Enter symptoms to predict disease';
      case 2:
        return 'See open appointments';
      default:
        return 'See closed appointments';
    }
  }
  ngOnInit(): void {}
}
