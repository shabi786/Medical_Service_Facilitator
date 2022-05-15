import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Appointment, AppointmentResponse } from '../../types';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-close-appointment',
  templateUrl: './close-appointment.component.html',
  styleUrls: ['./close-appointment.component.css'],
})
export class CloseAppointmentComponent implements OnInit {
  baseUrl = '';
  page = 1;
  totalPages: number;
  appointments: Appointment[] = [];
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ux: UxService
  ) {
    this.baseUrl = authService.baseURL;
    this.getAppointments();
  }
  getAppointments() {
    this.ux.startSpinner();
    this.http
      .get<AppointmentResponse>(`${this.baseUrl}/appointments`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe((res) => {
        this.ux.stopSpinner();
        if (res.success) {
          this.appointments = res.appointments;
          this.page = res.page;
          this.totalPages = res.totalPages;
        } else {
          this.ux.showToast('Error', res.message);
        }
      }, this.ux.errHandler);
  }

  ngOnInit(): void {}
}
