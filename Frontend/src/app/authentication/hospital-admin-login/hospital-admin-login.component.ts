import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-hospital-admin-login',
  templateUrl: './hospital-admin-login.component.html',
  styleUrls: ['./hospital-admin-login.component.css'],
})
export class HospitalAdminLoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.loginHospitalAdmin(this.email, this.password);
  }

  ngOnInit(): void {}
}
