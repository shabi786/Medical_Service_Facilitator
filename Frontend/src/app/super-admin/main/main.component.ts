import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import {
  ApproveHospitalAdminsResponse,
  ApproveSuperAdminsResponse,
  GenericResponse,
  HospitalData,
} from '../../types';
import { UxService } from '../../ux.service';

@Component({
  selector: 'super-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
