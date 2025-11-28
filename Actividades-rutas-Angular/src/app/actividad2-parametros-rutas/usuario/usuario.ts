import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="usuario-container">
      <h3>👥 Lista de Usuarios</h3>
      <p>Haz clic en un usuario para ver sus detalles:</p>
      
      <ul class="usuarios-lista">
        <li>
          <a [routerLink]="['/actividad2/usuarios', 1]" routerLinkActive="active">
            👤 Usuario 1 - Juan Pérez
          </a>
        </li>
        <li>
          <a [routerLink]="['/actividad2/usuarios', 2]" routerLinkActive="active">
            👤 Usuario 2 - María García
          </a>
        </li>
        <li>
          <a [routerLink]="['/actividad2/usuarios', 3]" routerLinkActive="active">
            👤 Usuario 3 - Carlos López
          </a>
        </li>
        <li>
          <a [routerLink]="['/actividad2/usuarios', 4]" routerLinkActive="active">
            👤 Usuario 4 - Ana Martínez
          </a>
        </li>
      </ul>

      <div class="detalle-area">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .usuario-container {
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    h3 {
      color: #1e3a8a;
      font-size: 24px;
      margin-bottom: 15px;
    }

    p {
      color: #6b7280;
      margin-bottom: 20px;
    }

    .usuarios-lista {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }

    .usuarios-lista li {
      background-color: #f3f4f6;
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .usuarios-lista li:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .usuarios-lista a {
      display: block;
      padding: 15px 20px;
      color: #1f2937;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .usuarios-lista a:hover {
      background-color: #3b82f6;
      color: white;
    }

    .usuarios-lista a.active {
      background-color: #10b981;
      color: white;
    }

    .detalle-area {
      margin-top: 30px;
      padding: 25px;
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      border-radius: 6px;
      min-height: 100px;
    }
  `]
})
export class UsuarioComponent {}