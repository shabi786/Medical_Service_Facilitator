import { Component, OnInit } from '@angular/core';
import {
  ApproveHospitalAdminsResponse,
  ApproveSuperAdminsResponse,
  GenericResponse,
  HospitalData,
} from '../../types';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css'],
})
export class ApproveComponent implements OnInit {
  user;
  baseURL = '';
  unapprovedSuperAdmins: { email: string }[] = [];
  unapprovedHospitalAdmins: {
    email: string;
    name: string;
    hospital: HospitalData;
  }[] = [];
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private ux: UxService
  ) {
    this.user = this.authService.user;
    this.baseURL = authService.baseURL;
  }
  getUnapprovedSuperAdmins() {
    this.ux.startSpinner();
    this.http
      .get<ApproveSuperAdminsResponse>(`${this.baseURL}/approve/super-admins`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe(
        (res) => {
          this.ux.stopSpinner();
          if (res.success) {
            this.unapprovedSuperAdmins = res.unapproved;
            if (res.unapproved.length === 0) {
              this.ux.showToast('Info', 'No super admin needs approval');
            }
          } else {
            this.ux.showToast('Error', res.message);
          }
        },
        (err) => {
          console.log(err);
          this.ux.showToast('Error', err.message || 'Something went wrong');
        }
      );
  }
  getUnapprovedHospitalAdmins() {
    this.ux.startSpinner();
    this.http
      .get<ApproveHospitalAdminsResponse>(
        `${this.baseURL}/approve/hospital-admins`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        }
      )
      .subscribe(
        (res) => {
          this.ux.stopSpinner();
          if (res.success) {
            this.unapprovedHospitalAdmins = res.unapproved;
            if (res.unapproved.length === 0) {
              this.ux.showToast('Info', 'No Hospital Admin needs approval');
            }
          } else {
            this.ux.showToast('Error', res.message);
          }
        },
        (err) => {
          this.ux.showToast('Error', err.message || 'Something went wrong');
        }
      );
  }
  approveSuperAdmin(email: string) {
    this.http
      .post<GenericResponse>(
        `${this.baseURL}/approve/super-admins`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        }
      )
      .subscribe((res) => {
        if (res.success) {
          this.ux.showToast('Success', res.message);
        } else {
          this.ux.showToast('Failure', res.message);
        }
        this.getUnapprovedSuperAdmins();
      });
  }
  deleteSuperAdmin(email: string) {
    this.http
      .delete<GenericResponse>(`${this.baseURL}/approve/super-admins`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params: { email },
      })
      .subscribe((res) => {
        if (res.success) {
          this.ux.showToast('Success', res.message);
        } else {
          this.ux.showToast('Failure', res.message);
        }
        this.getUnapprovedSuperAdmins();
      });
  }
  approveHospitalAdmin(email: string) {
    this.http
      .post<GenericResponse>(
        `${this.baseURL}/approve/hospital-admins`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        }
      )
      .subscribe((res) => {
        if (res.success) {
          this.ux.showToast('Success', res.message);
        } else {
          this.ux.showToast('Failure', res.message);
        }
        this.getUnapprovedHospitalAdmins();
      });
  }
  deleteHospitalAdmin(email: string) {
    this.http
      .delete<GenericResponse>(`${this.baseURL}/approve/hospital-admins`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        params: { email },
      })
      .subscribe((res) => {
        if (res.success) {
          this.ux.showToast('Success', res.message);
        } else {
          this.ux.showToast('Failure', res.message);
        }
        this.getUnapprovedHospitalAdmins();
      });
  }
  ngOnInit(): void {
    this.getUnapprovedSuperAdmins();
    this.getUnapprovedHospitalAdmins();
  }
}
