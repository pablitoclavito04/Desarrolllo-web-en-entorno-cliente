import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  Router, 
  RouterStateSnapshot, 
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

/**
 * Guard que protege rutas verificando si el usuario está autenticado
 * Implementa CanActivate para controlar el acceso a la zona protegida
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Determina si una ruta puede ser activada
   * @param route - Snapshot de la ruta que se intenta activar
   * @param state - Estado del router en el momento de la navegación
   * @returns true si puede activarse, UrlTree si debe redirigir
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const url = state.url;

    // Verificar si el usuario está autenticado
    if (this.authService.isLoggedIn()) {
      console.log('✅ AuthGuard: Acceso permitido a', url);
      return true;
    }

    // Si no está autenticado, denegar acceso y redirigir
    console.warn('❌ AuthGuard: Acceso denegado a', url);
    console.warn('⚠️ Por favor, inicia sesión primero');
    
    // Mostrar alerta al usuario
    alert('⚠️ Debes iniciar sesión para acceder a esta zona protegida');
    
    // Redirigir a la página principal
    return this.router.createUrlTree(['/']);
  }
}
