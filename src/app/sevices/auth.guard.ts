import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    if(tokenService.isTokenNotValid()) {
       router.navigate(['login'], { queryParams: { returnUrl: state.url }}); 
       return false;
    }

  return true;
};