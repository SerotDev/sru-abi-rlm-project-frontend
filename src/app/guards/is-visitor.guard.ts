import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isVisitorGuard: CanActivateFn = (route, state) => {
  const redirect = inject(Router);
  let isVisitor: boolean = false;
  sessionStorage.getItem('auth-rol') === 'VISITOR' || sessionStorage.getItem('auth-rol') === 'ADMIN' ? isVisitor = true : redirect.navigate(['/not-found']);
  return isVisitor;
};