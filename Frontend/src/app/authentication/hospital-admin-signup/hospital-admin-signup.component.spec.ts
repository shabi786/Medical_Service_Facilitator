import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminSignupComponent } from './hospital-admin-signup.component';

describe('HospitalAdminSignupComponent', () => {
  let component: HospitalAdminSignupComponent;
  let fixture: ComponentFixture<HospitalAdminSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAdminSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAdminSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
