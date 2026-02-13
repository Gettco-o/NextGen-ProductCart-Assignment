import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

/* 

Create an authGuard to protect routes - check if user is logged in using AuthService.isLoggedIn(), allow access if authenticated (return true), redirect to /login if not authenticated, and apply the guard to all routes except login & wildcard routes.

 */



export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['']);
  return false;
};
