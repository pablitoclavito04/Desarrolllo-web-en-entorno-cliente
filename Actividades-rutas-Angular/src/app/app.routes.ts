import { Routes } from '@angular/router';
import { Actividad1RutasBasicasComponent } from './actividad1-rutas-basicas/actividad1-rutas-basicas';
import { InicioComponent } from './actividad1-rutas-basicas/inicio/inicio';
import { AcercaComponent } from './actividad1-rutas-basicas/acerca/acerca';
import { Actividad2ParametrosRutasComponent } from './actividad2-parametros-rutas/actividad2-parametros-rutas';
import { UsuarioComponent } from './actividad2-parametros-rutas/usuario/usuario';
import { UsuarioDetalleComponent } from './actividad2-parametros-rutas/usuario-detalle/usuario-detalle';
import { Actividad3LazyLoading } from './actividad3-lazy-loading/actividad3-lazy-loading';
import { Actividad4RouteGuards } from './actividad4-route-guards/actividad4-route-guards';
import { ZonaProtegidaComponent } from './actividad4-route-guards/zona-protegida/zona-protegida';
import { AuthGuard } from './actividad4-route-guards/auth-guard';
import { Actividad5NavigationExtras } from './actividad5-navigation-extras/actividad5-navigation-extras';

export const routes: Routes = [
  { path: '', redirectTo: '/actividad1', pathMatch: 'full' },
  { 
    path: 'actividad1', 
    component: Actividad1RutasBasicasComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'acerca', component: AcercaComponent }
    ]
  },
  
  { 
    path: 'actividad2', 
    component: Actividad2ParametrosRutasComponent,
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { 
        path: 'usuarios', 
        component: UsuarioComponent,
        children: [
          { path: ':id', component: UsuarioDetalleComponent }
        ]
      }
    ]
  },

  { path: 'actividad3', component: Actividad3LazyLoading },
  {
    path: 'admin',
    loadComponent: () => import('./actividad3-lazy-loading/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent)
  },

  { path: 'actividad4', component: Actividad4RouteGuards },
  // RUTA PROTEGIDA: Solo accesible si estás autenticado
  {
    path: 'zona-protegida',
    component: ZonaProtegidaComponent,
    canActivate: [AuthGuard]
  },

  { path: 'actividad5', component: Actividad5NavigationExtras }
];