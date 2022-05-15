import { TestBed } from '@angular/core/testing';

import { UxService } from './ux.service';

describe('UxService', () => {
  let service: UxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
