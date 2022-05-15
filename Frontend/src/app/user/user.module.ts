import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageCardComponent } from './main-page-card/main-page-card.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DiseasePredictionComponent } from './disease-prediction/disease-prediction.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  declarations: [
    MainPageCardComponent,
    HospitalListComponent,
    AppointmentComponent,
    DiseasePredictionComponent,
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    NgMultiSelectDropDownModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CardModule,
    DialogModule,
    PickListModule,
  ],
  exports: [],
})
export class UserModule {}
