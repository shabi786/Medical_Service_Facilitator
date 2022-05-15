import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css'],
})
export class DoctorSignupComponent implements OnInit {
  email = '';
  password = '';
  hospital = '';
  name = '';
  mobileNo = 0;
  hospitalToSearch = '';
  hospitals: { id: string; name: string }[] = [];

  constructor(private authService: AuthService, private ux: UxService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.signupDoctor(
      this.email,
      this.password,
      this.hospital,
      this.name,
      this.mobileNo
    );
  }
  searchHospital(name: string) {
    this.authService.getHospitalList(name).subscribe((res: any) => {
      if (res.success) {
        this.hospitals = res.hospitals;
        this.hospital = this.hospitals[0].id;
      } else {
        this.ux.showToast('Error', res.message);
      }
    });
  }

  ngOnInit(): void {}
}
