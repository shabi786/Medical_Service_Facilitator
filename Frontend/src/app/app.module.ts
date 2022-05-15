import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { HospitalAdminModule } from './hospital-admin/hospital-admin.module';
import { HeaderComponent } from './header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouteHandlerModule } from './route-handler/route-handler.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    FormsModule,
    HttpClientModule,
    RouteHandlerModule,
    UserModule,
    DoctorModule,
    SuperAdminModule,
    HospitalAdminModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    MenubarModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
