import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PerfilUsuarioPageComponent } from './containers/perfil-usuario-page/perfil-usuario-page.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilUsuarioPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilUsuarioRoutingModule {}
