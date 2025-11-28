import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  template: `
    <div class="page-content">
      <h3>🏠 Página de Inicio</h3>
      <p>Bienvenido a la página de inicio de la Actividad 1.</p>
      <p>Esta es una navegación SPA (Single Page Application) implementada con Angular Router.</p>
      
      <div class="highlight-box">
        <p>✨ <strong>Observa:</strong> Al hacer clic en los enlaces del menú, la URL cambia pero la página NO se recarga completamente.</p>
        <p>🔍 Abre las DevTools (F12) y ve a la pestaña "Network" para verificar que no se hacen nuevas peticiones HTTP al navegar.</p>
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

    .highlight-box {
      margin-top: 20px;
      padding: 20px;
      background-color: #dbeafe;
      border-left: 4px solid #3b82f6;
      border-radius: 4px;
    }

    .highlight-box p {
      margin: 8px 0;
    }
  `]
})
export class InicioComponent {}