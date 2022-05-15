import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UxService } from '../../ux.service';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '../../types';

@Component({
  selector: 'app-create-hospital',
  templateUrl: './create-hospital.component.html',
  styleUrls: ['./create-hospital.component.css'],
})
export class CreateHospitalComponent implements OnInit {
  name = '';
  address = '';
  latitude = '';
  longitude = '';
  pincode = '';
  state = '';
  district = '';
  mobile = '';
  landline = '';
  emergency = '';
  constructor(
    private authService: AuthService,
    private ux: UxService,
    private http: HttpClient
  ) {}
  handleSubmit(e): void {
    e.preventDefault();
    if (!this.isValid()) {
      this.ux.showToast('Error', 'Fill all required fields correctly');
      return;
    }
    const landline = parseInt(this.landline.trim());
    const emergency = parseInt(this.emergency.trim());
    const mobile = parseInt(this.mobile.trim());
    const pincode = parseInt(this.pincode);
    const body: any = {
      name: this.name.trim(),
      address: this.address.trim(),
      latitude: parseFloat(this.latitude),
      longitude: parseFloat(this.longitude),
      pincode,
      state: this.state.trim(),
      district: this.district.trim(),
      mobile,
    };
    if (landline && !isNaN(landline)) {
      body.landline = landline;
    }
    if (emergency && !isNaN(emergency)) {
      body.emergency = emergency;
    }
    this.ux.startSpinner();
    this.http
      .post<GenericResponse>(`${this.authService.baseURL}/hospitals`, body, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe((res) => {
        this.ux.stopSpinner();
        const title = res.success ? 'Success' : 'Error';
        const message = res.success
          ? 'Hospital Created Successfully'
          : res.message;
        this.ux.showToast(title, message);
      }, this.ux.errHandler);
  }
  isValid(): boolean {
    return (
      this.name.trim() &&
      this.pincode &&
      this.pincode.toString().trim().length === 6 &&
      this.district.trim() &&
      this.address.trim() &&
      this.mobile.trim().length >= 10 &&
      !isNaN(parseInt(this.mobile.trim())) &&
      !isNaN(parseFloat(this.longitude)) &&
      !isNaN(parseFloat(this.latitude))
    );
  }
  ngOnInit(): void {}
}
