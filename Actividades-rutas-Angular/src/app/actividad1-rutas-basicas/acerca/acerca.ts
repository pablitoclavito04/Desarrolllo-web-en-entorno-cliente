import { Component } from '@angular/core';

@Component({
  selector: 'app-acerca',
  standalone: true,
  template: `
    <div class="page-content">
      <h3>ℹ️ Acerca de esta Aplicación</h3>
      <p>Esta aplicación demuestra el uso de rutas en Angular.</p>
      
      <div class="feature-list">
        <h4>Características implementadas:</h4>
        <ul>
          <li>✅ Navegación sin recarga de página (SPA)</li>
          <li>✅ Uso de <code>routerLink</code> para navegación declarativa</li>
          <li>✅ <code>routerLinkActive</code> para resaltar ruta activa</li>
          <li>✅ <code>router-outlet</code> como contenedor dinámico</li>
          <li>✅ Configuración de rutas en <code>app.routes.ts</code></li>
        </ul>
      </div>

      <div class="tech-info">
        <p><strong>Tecnología:</strong> Angular 18+ con sistema standalone</p>
        <p><strong>Router:</strong> @angular/router</p>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
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
      color: #4b5563;
      line-height: 1.8;
      margin: 10px 0;
    }

    .feature-list {
      margin: 20px 0;
      padding: 20px;
      background-color: #f0fdf4;
      border-radius: 8px;
      border: 1px solid #86efac;
    }

    .feature-list h4 {
      color: #15803d;
      margin-bottom: 15px;
    }

    .feature-list ul {
      list-style: none;
      padding: 0;
    }

    .feature-list li {
      padding: 8px 0;
      color: #166534;
    }

    code {
      background-color: #fef3c7;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #92400e;
    }

    .tech-info {
      margin-top: 20px;
      padding: 15px;
      background-color: #ede9fe;
      border-radius: 6px;
    }

    .tech-info p {
      margin: 5px 0;
      color: #5b21b6;
    }
  `]
})
export class AcercaComponent {}