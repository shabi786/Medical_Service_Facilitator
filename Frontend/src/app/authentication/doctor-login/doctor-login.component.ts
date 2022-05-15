import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css'],
})
export class DoctorLoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.loginDoctor(this.email, this.password);
  }

  ngOnInit(): void {}
}
