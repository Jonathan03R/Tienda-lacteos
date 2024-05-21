import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../service/autenticacionController/auth.service';
import { map } from 'rxjs';

export const routerInjection =() => inject(Router);
export const authStateObs$ = () => inject(AuthService).authState$;

export const authGuard: CanActivateFn = () => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if(!user){
        router.navigateByUrl('/login');
        return false;
      }
      return true
      
    })
  )
};

export const publicGuard: CanActivateFn = () => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if(user){
        router.navigateByUrl('/perfil');
        console.log("usuario esistente", user)
        return false;
      }
      return true
      
    })
  )
};
