import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isHotelGuard } from './is-hotel.guard';

describe('isHotelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isHotelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
