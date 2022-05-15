import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ROUTES } from '@angular/router';
import { AuthService } from '../auth.service';
import { MainPageComponent as UserMainPage } from '../user/main-page/main-page.component';
import { HospitalListComponent } from '../user/hospital-list/hospital-list.component';
import { DiseasePredictionComponent } from '../user/disease-prediction/disease-prediction.component';
import { AppointmentComponent } from '../user/appointment/appointment.component';
import { MainComponent as HospitalAdminMain } from '../hospital-admin/main/main.component';
import { ApproveDoctorComponent } from '../hospital-admin/approve-doctor/approve-doctor.component';
import { CloseAppointmentComponent } from '../hospital-admin/close-appointment/close-appointment.component';
import { MainComponent as SuperAdminMain } from '../super-admin/main/main.component';
import { MainComponent as DoctorMain } from '../doctor/main/main.component';
import { ApproveComponent } from '../super-admin/approve/approve.component';
import { CreateHospitalComponent } from '../super-admin/create-hospital/create-hospital.component';
import { SkillsComponent } from '../doctor/skills/skills.component';
import { HandleAppointmentComponent } from '../doctor/handle-appointment/handle-appointment.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  providers: [
    {
      provide: ROUTES,
      useFactory: configRouteHandler,
      deps: [AuthService],
      multi: true,
    },
  ],
})
export class RouteHandlerModule {}

export function configRouteHandler(authService: AuthService): Routes {
  let routes: Routes = [];
  if (authService.loggedIn) {
    if (authService.userType === 'user') {
      routes = [
        { component: UserMainPage, path: '' },
        { component: HospitalListComponent, path: 'hospitals' },
        { component: DiseasePredictionComponent, path: 'disease' },
        { component: AppointmentComponent, path: 'appointment/:status' },
      ];
    } else if (authService.userType === 'hospital_admin') {
      routes = [
        { path: '', component: HospitalAdminMain },
        { path: 'approve', component: ApproveDoctorComponent },
        { path: 'close', component: CloseAppointmentComponent },
      ];
    } else if (authService.userType === 'super_admin') {
      routes = [
        { path: '', component: SuperAdminMain },
        { path: 'approve', component: ApproveComponent },
        { path: 'create', component: CreateHospitalComponent },
      ];
    } else if (authService.userType === 'doctor') {
      routes = [
        { path: '', component: DoctorMain },
        { path: 'skills', component: SkillsComponent },
        { path: 'appointment', component: HandleAppointmentComponent },
      ];
    }
  }
  return routes;
}
