import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { ApproveDoctorsResponse, GenericResponse } from '../../types';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-approve-doctor',
  templateUrl: './approve-doctor.component.html',
  styleUrls: ['./approve-doctor.component.css'],
})
export class ApproveDoctorComponent implements OnInit {
  baseURL = '';
  unapproved = [];
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ux: UxService
  ) {
    this.baseURL = authService.baseURL;
    this.getList();
  }

  ngOnInit(): void {}
  approveDoctor(email: string) {
    this.ux.startSpinner();
    this.http
      .post<GenericResponse>(
        `${this.baseURL}/approve/doctors`,
        { email },
        {
          headers: { Authorization: `Bearer ${this.authService.token}` },
        }
      )
      .subscribe((res) => {
        this.ux.stopSpinner();
        const title = res.success ? 'Success' : 'Error';
        this.ux.showToast(title, res.message);
        this.getList();
      }, this.ux.errHandler);
  }
  deleteDoctor(email: string) {
    this.ux.startSpinner();
    this.http
      .delete<GenericResponse>(`${this.baseURL}/approve/doctors`, {
        headers: { Authorization: `Bearer ${this.authService.token}` },
        params: { email },
      })
      .subscribe((res) => {
        this.ux.stopSpinner();
        const title = res.success ? 'Success' : 'Error';
        this.ux.showToast(title, res.message);
        this.getList();
      }, this.ux.errHandler);
  }
  getList() {
    this.ux.startSpinner();
    this.http
      .get<ApproveDoctorsResponse>(`${this.baseURL}/approve/doctors`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe((res) => {
        this.ux.stopSpinner();
        if (res.success) {
          this.unapproved = res.unapproved;
          if (this.unapproved.length === 0) {
            this.ux.showToast('Info', 'No doctor needs approval');
          }
        } else {
          this.ux.showToast('Error', res.message);
        }
      }, this.ux.errHandler);
  }
}
