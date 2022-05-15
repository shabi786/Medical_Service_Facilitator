import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UxService } from '../ux.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  constructor(private authService: AuthService, public ux: UxService) {
    this.items = [
      {
        label: 'Goto Home',
        routerLink: '/',
      },
    ];
  }

  ngOnInit(): void {}
  logout(): void {
    this.authService.logout();
  }
}
