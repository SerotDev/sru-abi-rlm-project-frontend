import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  const redirect = inject(Router);
  const authToken = sessionStorage.getItem('auth-token');
  return authToken && authToken !== "" ? true : redirect.navigate(['/not-found']);
}