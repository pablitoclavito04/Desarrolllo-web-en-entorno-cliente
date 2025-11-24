import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './actividad1-registro/actividad1-registro';
import { Actividad2ProductosComponent } from './actividad2-productos/actividad2-productos';
import { Actividad3Factura } from './actividad3-factura/actividad3-factura';
import { Actividad4RegistroAvanzadoComponent } from './actividad4-registro-avanzado/actividad4-registro-avanzado';
import { Actividad5PerfilUsuarioComponent } from './actividad5-perfil-usuario/actividad5-perfil-usuario';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RegistroComponent,
    Actividad2ProductosComponent,
    Actividad3Factura,
    Actividad4RegistroAvanzadoComponent,
    Actividad5PerfilUsuarioComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  actividadActual = 0;
  title = 'Actividades-formularios-Angular';
}