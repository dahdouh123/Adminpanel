import { TestBed } from '@angular/core/testing';

import { RstelecomServiceService } from './rstelecom-service.service';

describe('RstelecomServiceService', () => {
  let service: RstelecomServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RstelecomServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
