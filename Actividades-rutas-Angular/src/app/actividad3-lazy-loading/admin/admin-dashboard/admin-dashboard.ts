import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,  
  imports: [CommonModule],  
  template: `
    <div class="admin-dashboard">
      <div class="success-banner">
        <h3>✅ ¡Módulo cargado exitosamente!</h3>
        <p>Este módulo se cargó de forma <strong>lazy</strong> (perezosa).</p>
      </div>

      <div class="dashboard-content">
        <h2>🔐 Panel de Administración</h2>
        <p>Bienvenido al módulo de administración cargado dinámicamente.</p>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-value">1,234</div>
            <div class="stat-label">Usuarios</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📦</div>
            <div class="stat-value">567</div>
            <div class="stat-label">Productos</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-value">89%</div>
            <div class="stat-label">Rendimiento</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-value">€45K</div>
            <div class="stat-label">Ventas</div>
          </div>
        </div>

        <div class="info-technical">
          <h4>🔍 Información Técnica:</h4>
          <ul>
            <li>✅ Este módulo NO se cargó en el bundle inicial</li>
            <li>✅ Se descargó solo cuando accediste a esta ruta</li>
            <li>✅ Usa <code>loadChildren</code> en la configuración de rutas</li>
            <li>✅ Angular genera un chunk separado (.js) para este módulo</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      animation: fadeIn 0.4s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .success-banner {
      padding: 20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      border-radius: 8px;
      margin-bottom: 30px;
      text-align: center;
    }

    .success-banner h3 {
      margin: 0 0 10px 0;
      font-size: 24px;
    }

    .success-banner p {
      margin: 0;
      font-size: 16px;
    }

    .dashboard-content h2 {
      color: #1e3a8a;
      font-size: 26px;
      margin-bottom: 10px;
    }

    .dashboard-content > p {
      color: #6b7280;
      margin-bottom: 30px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      padding: 25px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      border-radius: 8px;
      text-align: center;
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
    }

    .stat-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }

    .stat-value {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 14px;
      opacity: 0.9;
    }

    .info-technical {
      padding: 25px;
      background-color: #ede9fe;
      border-left: 4px solid #8b5cf6;
      border-radius: 6px;
    }

    .info-technical h4 {
      color: #5b21b6;
      margin-top: 0;
      margin-bottom: 15px;
    }

    .info-technical ul {
      margin: 0;
      padding-left: 20px;
      color: #6b21a8;
    }

    .info-technical li {
      margin: 8px 0;
      line-height: 1.6;
    }

    .info-technical code {
      background-color: #fef3c7;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #92400e;
    }
  `]
})
export class AdminDashboardComponent {}