import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isHotelGuard: CanActivateFn = (route, state) => {
  const redirect = inject(Router);
  if (sessionStorage.getItem('auth-rol') !== 'HOTEL' && sessionStorage.getItem('auth-rol') !== 'ADMIN') {
    redirect.navigate(['/']);
    return false;
  }

  return sessionStorage.getItem('auth-rol') === 'HOTEL' || sessionStorage.getItem('auth-rol') === 'ADMIN';
};