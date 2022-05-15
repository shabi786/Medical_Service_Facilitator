import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-super-admin-signup',
  templateUrl: './super-admin-signup.component.html',
  styleUrls: ['./super-admin-signup.component.css'],
})
export class SuperAdminSignupComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.signupSuperAdmin(this.email, this.password);
  }

  ngOnInit(): void {}
}
