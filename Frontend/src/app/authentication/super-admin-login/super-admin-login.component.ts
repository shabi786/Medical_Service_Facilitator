import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-super-admin-login',
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.css'],
})
export class SuperAdminLoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.loginSuperAdmin(this.email, this.password);
  }

  ngOnInit(): void {}
}
