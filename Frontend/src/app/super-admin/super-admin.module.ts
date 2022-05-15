import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { MainComponent } from './main/main.component';
import { ApproveComponent } from './approve/approve.component';
import { CreateHospitalComponent } from './create-hospital/create-hospital.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainComponent, ApproveComponent, CreateHospitalComponent],
  imports: [CommonModule, SuperAdminRoutingModule, FormsModule],
  exports: [MainComponent],
})
export class SuperAdminModule {}
