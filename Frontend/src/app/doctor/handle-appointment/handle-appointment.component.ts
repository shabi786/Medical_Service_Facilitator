import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../types';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-handle-appointment',
  templateUrl: './handle-appointment.component.html',
  styleUrls: ['./handle-appointment.component.css'],
})
export class HandleAppointmentComponent implements OnInit {
  user;
  appointment: Appointment;
  appointmentID = '';
  remarks = '';
  nextAppointment = '';
  fees = '';
  unpaid = '';
  monitoring = [];
  monitoringParameter = '';
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private ux: UxService
  ) {
    this.user = authService.user;
  }
  searchAppointment(e): void {
    e.preventDefault();
    this.ux.startSpinner();
    this.reset();
    this.http
      .get(`${this.authService.baseURL}/appointment/${this.appointmentID}`, {
        headers: { Authorization: `Bearer ${this.authService.token}` },
      })
      .subscribe((res: any) => {
        this.ux.stopSpinner();
        if (res.success) {
          this.appointment = res.appointment;
        } else {
          this.ux.showToast('Error', res.message);
        }
      }, this.ux.errHandler);
  }

  handleInput(e): void {
    this.appointmentID = e.target.value.trim();
  }
  reset(): void {
    this.appointment = null;
    this.remarks = '';
    this.fees = '';
    this.nextAppointment = '';
    this.unpaid = '';
    this.monitoring = [];
  }
  addDetail(e): void {
    e.preventDefault();
    this.ux.startSpinner();
    const monitoring = {};
    this.monitoring.forEach((row) => {
      monitoring[row[0].trim()] = row[1].trim();
    });
    let nextAppointment: any = this.nextAppointment.split('T');
    nextAppointment[0] = nextAppointment[0].split('-').reverse().join('/');
    nextAppointment = nextAppointment.join(' ');
    const body: any = {
      remarks: this.remarks.trim(),
      monitoring,
      next_date: nextAppointment,
    };
    const fees = parseFloat(this.fees);
    const unpaid = parseFloat(this.unpaid);
    if (fees && !isNaN(fees)) {
      body.fees = fees;
    }
    if (unpaid && !isNaN(unpaid)) {
      body.unpaid = unpaid;
    }
    this.http
      .post(
        `${this.authService.baseURL}/appointment/${this.appointment.id}`,
        body,
        {
          headers: { Authorization: `Bearer ${this.authService.token}` },
        }
      )
      .subscribe((res: any) => {
        this.ux.stopSpinner();
        if (res.success) {
          this.ux.showToast('Success', 'Data Added Successfully');
          this.reset();
          this.appointment = res.appointment;
        } else {
          this.ux.showToast('Error', res.message || 'Something went wrong');
        }
      }, this.ux.errHandler);
  }
  addMonitoringRow(): void {
    if (this.monitoringParameter.trim()) {
      this.monitoring.push([this.monitoringParameter, '']);
      this.monitoringParameter = '';
    } else {
      this.ux.showToast('Error', 'Monitoring Parameter is empty');
    }
  }
  removeMonitoringRow(i: number): void {
    this.monitoring.splice(i, 1);
  }

  ngOnInit(): void {}
}
