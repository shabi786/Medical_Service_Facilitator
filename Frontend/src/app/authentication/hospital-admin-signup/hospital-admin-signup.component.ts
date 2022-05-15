import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UxService } from '../../ux.service';

@Component({
  selector: 'app-hospital-admin-signup',
  templateUrl: './hospital-admin-signup.component.html',
  styleUrls: ['./hospital-admin-signup.component.css'],
})
export class HospitalAdminSignupComponent implements OnInit {
  email = '';
  password = '';
  hospital = '';
  name = '';
  hospitals: { id: string; name: string }[] = [];
  hospitalToSearch = '';

  constructor(private authService: AuthService, private ux: UxService) {}
  onSubmit(event) {
    event.preventDefault();
    this.authService.signupHospitalAdmin(
      this.email,
      this.password,
      this.hospital,
      this.name
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
