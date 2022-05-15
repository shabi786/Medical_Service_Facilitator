import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'hospital-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  user;
  constructor(private authService: AuthService) {
    this.user = authService.user;
  }

  ngOnInit(): void {}
}
