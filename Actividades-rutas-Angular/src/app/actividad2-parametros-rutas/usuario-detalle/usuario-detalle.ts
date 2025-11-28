import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
}

@Component({
  selector: 'app-usuario-detalle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="detalle-container">
      <h4>📋 Detalle del Usuario</h4>
      
      <div *ngIf="usuario" class="usuario-card">
        <div class="campo">
          <span class="label">🆔 ID:</span>
          <span class="valor">{{ usuario.id }}</span>
        </div>
        <div class="campo">
          <span class="label">👤 Nombre:</span>
          <span class="valor">{{ usuario.nombre }}</span>
        </div>
        <div class="campo">
          <span class="label">📧 Email:</span>
          <span class="valor">{{ usuario.email }}</span>
        </div>
        <div class="campo">
          <span class="label">📱 Teléfono:</span>
          <span class="valor">{{ usuario.telefono }}</span>
        </div>
        <div class="campo">
          <span class="label">🏙️ Ciudad:</span>
          <span class="valor">{{ usuario.ciudad }}</span>
        </div>
      </div>

      <div class="info-tecnica">
        <p>
          <strong>ℹ️ Información técnica:</strong><br>
          El parámetro <code>:id</code> se obtuvo usando <code>ActivatedRoute.snapshot.paramMap.get('id')</code>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .detalle-container {
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    h4 {
      color: #92400e;
      font-size: 20px;
      margin-bottom: 20px;
    }

    .usuario-card {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .campo {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;
    }

    .campo:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: bold;
      color: #6b7280;
    }

    .valor {
      color: #1f2937;
      font-weight: 500;
    }

    .info-tecnica {
      padding: 15px;
      background-color: #dbeafe;
      border-radius: 6px;
      font-size: 14px;
    }

    .info-tecnica code {
      background-color: #fef3c7;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #92400e;
    }
  `]
})
export class UsuarioDetalleComponent implements OnInit {
  userId: string | null = null;
  usuario: Usuario | null = null;

  // Base de datos simulada
  private usuarios: Usuario[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '600-235-180', ciudad: 'Madrid' },
    { id: 2, nombre: 'María García', email: 'maria@example.com', telefono: '603-626-279', ciudad: 'Barcelona' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@example.com', telefono: '633-142-388', ciudad: 'Valencia' },
    { id: 4, nombre: 'Ana Martínez', email: 'ana@example.com', telefono: '401-154-590', ciudad: 'Sevilla' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // 🔥 CAMBIO: Usa paramMap como Observable en lugar de snapshot
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      
      // Buscar el usuario en la base de datos simulada
      if (this.userId) {
        const id = parseInt(this.userId);
        this.usuario = this.usuarios.find(u => u.id === id) || null;
      }
    });
  }
}