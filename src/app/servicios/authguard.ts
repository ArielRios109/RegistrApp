// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../servicios/authService';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Promise<boolean> {
        if (await this.authService.isAuthenticatedUser()) {
          return true; // Usuario autenticado, permite el acceso
        } else {
          // Usuario no autenticado, redirige a la página de inicio de sesión
          this.router.navigate(['/login']);
          return false;
        }
      }
}

