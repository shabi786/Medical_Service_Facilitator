import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminLoginComponent } from './hospital-admin-login.component';

describe('HospitalAdminLoginComponent', () => {
  let component: HospitalAdminLoginComponent;
  let fixture: ComponentFixture<HospitalAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAdminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
