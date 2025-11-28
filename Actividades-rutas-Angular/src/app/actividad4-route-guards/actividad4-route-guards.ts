import { Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth-service';

/**
 * Componente principal de la Actividad 4: Route Guards
 * Incluye formulario de login con validación de credenciales
 */
@Component({
  selector: 'app-actividad4-route-guards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './actividad4-route-guards.html',
  styleUrl: './actividad4-route-guards.css'
})
export class Actividad4RouteGuards implements OnInit {
  // Inyección de dependencias
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Referencias a los inputs del formulario
  @ViewChild('username') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;
  
  // Estado del componente
  isAuthenticated: boolean = false;
  loginError: boolean = false;
  
  // Credenciales de prueba
  private readonly VALID_USERNAME = 'admin';
  private readonly VALID_PASSWORD = '1234';

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  /**
   * Verifica y actualiza el estado de autenticación
   */
  checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  /**
   * Maneja el envío del formulario de login
   */
  onLogin(event: Event): void {
    event.preventDefault();
    
    // Obtener valores de los inputs
    const username = this.usernameInput?.nativeElement.value || '';
    const password = this.passwordInput?.nativeElement.value || '';
    
    // Validar credenciales
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      // Login exitoso
      this.loginError = false;
      this.authService.login();
      this.checkAuthStatus();
      
      console.log('✅ Login exitoso');
      alert('✅ Has iniciado sesión correctamente.\n\nAhora puedes acceder a la Zona Protegida.');
    } else {
      // Login fallido
      this.loginError = true;
      console.warn('❌ Credenciales incorrectas');
      
      // Limpiar el formulario
      if (this.usernameInput) this.usernameInput.nativeElement.value = '';
      if (this.passwordInput) this.passwordInput.nativeElement.value = '';
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  onLogout(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.loginError = false;
      this.authService.logout();
      this.checkAuthStatus();
      console.log('👋 Sesión cerrada');
    }
  }

  /**
   * Navega a la zona protegida
   * El guard interceptará si no está autenticado
   */
  goToProtected(): void {
    if (!this.isAuthenticated) {
      alert('⚠️ Esto no debería mostrarse si estás autenticado');
    }
    this.router.navigate(['/zona-protegida']);
  }
}

