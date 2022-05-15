import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment, GenericResponse } from '../../types';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css'],
})
export class AppointmentCardComponent implements OnInit {
  @Input() appointment: Appointment;
  @Input() hideCancel = false;
  @Input() forceCancel = false;
  @Output() deleted = new EventEmitter();
  show = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ux: UxService
  ) {}
  cancelAppointment(id: string) {
    this.ux.startSpinner();
    const url = `${this.authService.baseURL}/appointment/${id}`;
    this.http
      .delete(url, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe((res: GenericResponse) => {
        this.ux.stopSpinner();
        const title = res.success ? 'Success' : 'Failed';
        this.ux.showToast(title, res.message);
        this.deleted.emit();
      }, this.ux.errHandler);
  }
  getUnpaid(): number {
    let unpaid = 0;
    this.appointment.visits.forEach((v) => {
      unpaid += v.unpaid;
    });
    return unpaid;
  }
  getWidth() {
    return window.innerWidth * 0.95;
  }
  getDummy() {
    return [
      ...this.appointment.visits,
      ...this.appointment.visits,
      ...this.appointment.visits,
      ...this.appointment.visits,
      ...this.appointment.visits,
      ...this.appointment.visits,
    ];
  }
  ngOnInit(): void {}
}
