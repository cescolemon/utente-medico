import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedRoles = next.data['roles'] as Array<string>; // Ruoli richiesti per l'accesso alla rotta

    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole(); // Ottieni il ruolo dell'utente dal servizio AuthService
      if (expectedRoles.includes(userRole)) {
        return true; // L'utente ha il ruolo richiesto per l'accesso alla rotta
      } else {
        // L'utente non ha il ruolo richiesto, reindirizza alla pagina di accesso
        return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      }
    } else {
      // L'utente non è autenticato, reindirizza alla pagina di accesso
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
