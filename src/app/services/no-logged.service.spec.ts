import { TestBed } from '@angular/core/testing';

import { NoLoggedService } from './no-logged.service';

describe('NoLoggedService', () => {
  let service: NoLoggedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoLoggedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
