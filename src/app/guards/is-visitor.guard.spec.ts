import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isVisitorGuard } from './is-visitor.guard';

describe('isVisitorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isVisitorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
