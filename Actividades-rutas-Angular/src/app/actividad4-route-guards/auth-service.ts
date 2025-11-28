import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Servicio de autenticación para la Actividad 4
 * Simula el estado de login del usuario
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Estado de autenticación (en una app real, esto vendría de un backend)
  private loggedIn = false;

  constructor(private router: Router) {}

  /**
   * Simula el proceso de login
   * @returns true si el login fue exitoso
   */
  login(): boolean {
    this.loggedIn = true;
    console.log('✅ Usuario autenticado correctamente');
    return true;
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    this.loggedIn = false;
    console.log('👋 Usuario ha cerrado sesión');
    // Redirigir a la página de inicio o login
    this.router.navigate(['/']);
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si el usuario está logueado
   */
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  /**
   * Obtiene el estado de autenticación
   * @returns Objeto con el estado actual
   */
  getAuthStatus(): { isAuthenticated: boolean } {
    return { isAuthenticated: this.loggedIn };
  }
}
