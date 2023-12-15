import { CanActivateFn } from '@angular/router';

export const isVisitorGuard: CanActivateFn = (route, state) => {
  return true;
};
