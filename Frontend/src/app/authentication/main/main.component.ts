import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  type = 0;
  signup = false;
  display = false;
  @ViewChild('overlay') overlay: ElementRef;
  constructor() {}

  getWidth(): number {
    return window.innerWidth;
  }
  getTitle(): string {
    const title = this.signup ? 'Signup for ' : 'Login for ';
    if (this.type === 0) {
      return title + 'User';
    }
    if (this.type === 1) {
      return title + 'Doctor';
    }
    if (this.type === 2) {
      return title + 'Hospital Admin';
    }
    return title + 'Super Admin';
  }
  toggleOverlay() {
    if (this.display) {
      this.overlay.nativeElement.style.display = 'block';
    } else {
      this.overlay.nativeElement.style.display = 'none';
    }
  }

  ngOnInit(): void {}
}
