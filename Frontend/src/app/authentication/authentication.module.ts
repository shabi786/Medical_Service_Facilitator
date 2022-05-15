import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { DoctorSignupComponent } from './doctor-signup/doctor-signup.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { HospitalAdminLoginComponent } from './hospital-admin-login/hospital-admin-login.component';
import { HospitalAdminSignupComponent } from './hospital-admin-signup/hospital-admin-signup.component';
import { SuperAdminSignupComponent } from './super-admin-signup/super-admin-signup.component';
import { SuperAdminLoginComponent } from './super-admin-login/super-admin-login.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MainPageCardComponent } from './main-page-card/main-page-card.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserSignupComponent,
    DoctorSignupComponent,
    DoctorLoginComponent,
    HospitalAdminLoginComponent,
    HospitalAdminSignupComponent,
    SuperAdminSignupComponent,
    SuperAdminLoginComponent,
    MainComponent,
    MainPageCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
  ],
  exports: [MainComponent],
})
export class AuthenticationModule {}
