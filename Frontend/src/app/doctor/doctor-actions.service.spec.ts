import { TestBed } from '@angular/core/testing';

import { DoctorActionsService } from './doctor-actions.service';

describe('DoctorActionsService', () => {
  let service: DoctorActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
