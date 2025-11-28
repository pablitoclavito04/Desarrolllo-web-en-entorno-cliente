import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';

/**
 * Componente de Zona Protegida
 * Solo accesible si el usuario está autenticado (protegido por AuthGuard)
 */
@Component({
  selector: 'app-zona-protegida',
  templateUrl: './zona-protegida.html',
  styleUrls: ['./zona-protegida.css']
})
export class ZonaProtegidaComponent implements OnInit {
  
  // Información del usuario autenticado
  userName: string = 'Usuario';
  accessTime: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Registrar el momento de acceso
    this.accessTime = new Date().toLocaleString('es-ES');
    console.log('ZonaProtegidaComponent inicializado');
    console.log('Hora de acceso:', this.accessTime);
  }

  /**
   * Cierra la sesión del usuario
   */
  cerrarSesion(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.authService.logout();
      // El AuthService ya maneja la redirección
    }
  }

  /**
   * Obtiene el estado de autenticación
   */
  obtenerEstado(): void {
    const estado = this.authService.getAuthStatus();
    console.log('Estado de autenticación:', estado);
    alert(`Estado: ${estado.isAuthenticated ? '✅ Autenticado' : '❌ No autenticado'}`);
  }
}
