import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminLoginComponent } from './super-admin-login.component';

describe('SuperAdminLoginComponent', () => {
  let component: SuperAdminLoginComponent;
  let fixture: ComponentFixture<SuperAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
