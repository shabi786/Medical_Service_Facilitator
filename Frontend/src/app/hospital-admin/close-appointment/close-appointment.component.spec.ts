import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAppointmentComponent } from './close-appointment.component';

describe('CloseAppointmentComponent', () => {
  let component: CloseAppointmentComponent;
  let fixture: ComponentFixture<CloseAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
