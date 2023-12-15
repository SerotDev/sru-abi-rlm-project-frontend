import { CanActivateFn } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  return true;
};
