import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isHotelGuard: CanActivateFn = (route, state) => {
  const redirect = inject(Router);
  let isHotel: boolean = false;
  sessionStorage.getItem('auth-rol') === 'HOTEL' || sessionStorage.getItem('auth-rol') === 'ADMIN'? isHotel = true : redirect.navigate(['/not-found']);
  return isHotel;
};