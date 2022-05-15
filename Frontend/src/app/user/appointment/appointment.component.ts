import { Component, OnInit } from '@angular/core';
import { UserActionService } from '../user-action.service';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../../types';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  totalAppointments: number;
  page = 0;
  totalPages = 0;
  closed = false;
  constructor(
    private userActionService: UserActionService,
    private route: ActivatedRoute,
    private ux: UxService
  ) {
    this.route.params.subscribe((p) => {
      if (p.status === 'closed') {
        this.closed = true;
      }
      this.getData();
    });
  }

  getData(page = 1) {
    this.ux.startSpinner();
    this.userActionService
      .getAppointment(this.closed, page)
      .subscribe((res) => {
        this.ux.stopSpinner();
        if (res.success) {
          this.appointments = res.appointments;
          this.page = res.page;
          this.totalPages = res.totalPages;
          this.totalAppointments = res.totalAppointments;
        } else {
          this.ux.showToast('Error', res.message);
        }
      }, this.ux.errHandler);
  }
  ngOnInit(): void {}
}
