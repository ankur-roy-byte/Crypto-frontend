import { TestBed } from '@angular/core/testing';

import { WazirxServiceService } from './wazirx-service.service';

describe('WazirxServiceService', () => {
  let service: WazirxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WazirxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
