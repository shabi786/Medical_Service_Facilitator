import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  dob: string = '';
  name: string = '';
  mobileNo: number = 0;

  constructor(private authService: AuthService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.signupUser(
      this.email,
      this.password,
      this.dob,
      this.name,
      this.mobileNo
    );
  }

  ngOnInit(): void {}
}
