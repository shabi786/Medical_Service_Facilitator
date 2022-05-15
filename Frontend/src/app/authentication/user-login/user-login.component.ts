import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.loginUser(this.email, this.password);
  }

  ngOnInit(): void {}
}
