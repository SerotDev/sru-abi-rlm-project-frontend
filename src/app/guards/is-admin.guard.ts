import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const redirect = inject(Router);
  let isAdmin: boolean = false;
  sessionStorage.getItem('auth-rol') === 'ADMIN' ? isAdmin = true : redirect.navigate(['/not-found']);
  return isAdmin;
};
