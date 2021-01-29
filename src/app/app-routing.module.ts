import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './pages/auth/guards';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { VistasRoutingModule } from './pages/vistas/vistas-routing.module';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardPageComponent,
  },
  {
    path: 'inicio',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'usuarios',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: 'grupos-permisos',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/grupos-permisos/grupos-permisos.module').then(
        (m) => m.GruposPermisosModule
      ),
  },
  {
    path: 'reportes',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/reportes/reportes.module').then((m) => m.ReportesModule),
  },
  {
    path: 'vistas',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/vistas/vistas.module').then((m) => m.VistasModule),
  },
  {
    path: 'tableros',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tableros/tableros.module').then((m) => m.TablerosModule),
  },
  {
    path: 'perfil-usuario',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/perfil-usuario/perfil-usuario.module').then(
        (m) => m.PerfilUsuarioModule
      ),
  },
  {
    path: 'presentaciones',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/presentaciones/presentaciones.module').then(
        (m) => m.PresentacionesModule
      ),
  },
  {
    path: 'tables',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tables/tables.module').then((m) => m.TablesModule),
  },
  {
    path: 'notification',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/notification/notification.module').then(
        (m) => m.NotificationModule
      ),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
