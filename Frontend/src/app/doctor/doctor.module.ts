import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HandleAppointmentComponent } from './handle-appointment/handle-appointment.component';
import { SkillsComponent } from './skills/skills.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [MainComponent, HandleAppointmentComponent, SkillsComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    FormsModule,
    NgMultiSelectDropDownModule,
  ],
  exports: [MainComponent],
})
export class DoctorModule {}
