import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { CloseAppointmentComponent } from './close-appointment/close-appointment.component';
import { ApproveDoctorComponent } from './approve-doctor/approve-doctor.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    CloseAppointmentComponent,
    ApproveDoctorComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [MainComponent],
})
export class HospitalAdminModule {}
