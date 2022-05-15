import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { DiseasePredictionComponent } from './disease-prediction/disease-prediction.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { component: MainPageComponent, path: '' },
  { component: HospitalListComponent, path: 'hospitals' },
  { component: DiseasePredictionComponent, path: 'disease' },
  { component: AppointmentComponent, path: 'appointment/:status' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
