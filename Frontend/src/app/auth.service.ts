import {
  HospitalAdminAuthResponse,
  SuperAdminAuthResponse,
  UserAuthResponse,
  DoctorAuthResponse,
} from './types';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UxService } from './ux.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  user: any;
  userType = '';
  token = '';
  baseURL = 'https://realtimehospital.herokuapp.com';
  constructor(private http: HttpClient, private ux: UxService) {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userType = localStorage.getItem('userType');
      this.token = localStorage.getItem('token');
      this.loggedIn = true;
    }
  }

  private setUser(user: any, type: string, token: string): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', type);
    localStorage.setItem('token', token);
    location.reload();
  }
  signupUser(
    email: string,
    password: string,
    dob: string,
    name: string,
    mobile: number
  ): void {
    dob = dob.split('-').reverse().join('/');
    this.ux.startSpinner();
    this.http
      .post(`${this.baseURL}/signup/user`, {
        email,
        password,
        dob,
        name,
        mobile: '' + mobile,
      })
      .subscribe((response: UserAuthResponse) => {
        this.ux.stopSpinner();
        if (!response.success) {
          this.ux.showToast('Error', response.message);
        } else {
          this.setUser(response.user, 'user', response.token);
        }
      }, this.ux.errHandler);
  }
  signupDoctor(
    email: string,
    password: string,
    hospital: string,
    name: string,
    mobile: number
  ): void {
    this.ux.startSpinner();
    this.http
      .post(`${this.baseURL}/signup/doctor`, {
        email,
        password,
        hospital,
        name,
        mobile: '' + mobile,
      })
      .subscribe((response: DoctorAuthResponse) => {
        this.ux.stopSpinner();
        if (!response.success) {
          this.ux.showToast('Error', response.message);
        } else {
          this.setUser(response.doctor, 'doctor', response.token);
        }
      }, this.ux.errHandler);
  }
  signupHospitalAdmin(
    email: string,
    password: string,
    hospital: string,
    name: string
  ): void {
    this.ux.startSpinner();
    this.http
      .post(`${this.baseURL}/signup/hospital-admin`, {
        email,
        password,
        hospital,
        name,
      })
      .subscribe((response: HospitalAdminAuthResponse) => {
        this.ux.stopSpinner();
        if (!response.success) {
          this.ux.showToast('Error', response.message);
        } else {
          this.setUser(
            response.hospital_admin,
            'hospital_admin',
            response.token
          );
        }
      }, this.ux.errHandler);
  }
  signupSuperAdmin(email: string, password: string): void {
    this.ux.startSpinner();
    this.http
      .post(`${this.baseURL}/signup/super-admin`, {
        email,
        password,
      })
      .subscribe((response: SuperAdminAuthResponse) => {
        this.ux.stopSpinner();
        if (!response.success) {
          this.ux.showToast('Error', response.message);
        } else {
          this.setUser(response.super_admin, 'super_admin', response.token);
        }
      }, this.ux.errHandler);
  }
  loginUser(email: string, password: string): void {
    this.ux.startSpinner();
    this.http
      .post(`${this.baseURL}/login/user`, {
        email,
        password,
      })
      .subscribe((response: UserAuthResponse) => {
        this.ux.stopSpinner();
        if (!response.success) {
          this.ux.showToast('Error', response.message);
        } else {
          this.setUser(response.user, 'user', response.token);
        }
      }, this.ux.errHandler);
  }
  loginDoctor(email: string, password: string): void {
    this.ux.startSpinner();
    this.http
      .post(`${this.baseURL}/login/doctor`, {
        email,
        password,
      })
      .subscribe((response: DoctorAuthResponse) => {
        this.ux.stopSpinner();
        if (!response.success) {
          this.ux.showToast('Error', response.message);
        } else {
          this.setUser(response.doctor, 'doctor', response.token);
        }
      }, this.ux.errHandler);
  }
  loginSuperAdmin(email: string, password: string): void {
    this.ux.startSpinner();
    this.http
      .post(`${this.baseURL}/login/super-admin`, {
        email,
        password,
      })
      .subscribe((response: SuperAdminAuthResponse) => {
        this.ux.stopSpinner();
        if (!response.success) {
          this.ux.showToast('Error', response.message);
        } else {
          this.setUser(response.super_admin, 'super_admin', response.token);
        }
      }, this.ux.errHandler);
  }
  loginHospitalAdmin(email: string, password: string): void {
    this.ux.startSpinner();
    this.http
      .post(`${this.baseURL}/login/hospital-admin`, {
        email,
        password,
      })
      .subscribe((response: HospitalAdminAuthResponse) => {
        this.ux.stopSpinner();
        if (!response.success) {
          this.ux.showToast('Error', response.message);
        } else {
          this.setUser(
            response.hospital_admin,
            'hospital_admin',
            response.token
          );
        }
      }, this.ux.errHandler);
  }
  logout(): void {
    this.loggedIn = false;
    this.user = {};
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
  }
  getHospitalList(hospitalName: string) {
    if (hospitalName.trim().length > 0) {
      return this.http.get(this.baseURL + '/search', {
        params: {
          name: hospitalName,
        },
      });
    }
  }
}
