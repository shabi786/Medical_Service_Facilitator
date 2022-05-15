import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminSignupComponent } from './super-admin-signup.component';

describe('SuperAdminSignupComponent', () => {
  let component: SuperAdminSignupComponent;
  let fixture: ComponentFixture<SuperAdminSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
