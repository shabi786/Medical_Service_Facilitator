import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDoctorComponent } from './approve-doctor.component';

describe('ApproveDoctorComponent', () => {
  let component: ApproveDoctorComponent;
  let fixture: ComponentFixture<ApproveDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
