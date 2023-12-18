import { CanActivateFn } from '@angular/router';

export const isHotelGuard: CanActivateFn = (route, state) => {
  return true;
};
