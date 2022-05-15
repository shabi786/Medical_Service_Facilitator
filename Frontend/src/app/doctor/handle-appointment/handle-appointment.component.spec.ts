import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleAppointmentComponent } from './handle-appointment.component';

describe('HandleAppointmentComponent', () => {
  let component: HandleAppointmentComponent;
  let fixture: ComponentFixture<HandleAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
