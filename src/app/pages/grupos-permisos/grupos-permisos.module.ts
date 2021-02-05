import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GruposPermisosPageComponent } from './containers/grupos-permisos-page/grupos-permisos-page.component';
import { GruposPermisosRoutingModule } from './grupos-permisos-routing.module';
import { FormGruposPermisosComponent } from './components/form-grupos-permisos/form-grupos-permisos.component';

@NgModule({
  declarations: [GruposPermisosPageComponent, FormGruposPermisosComponent],
  imports: [SharedModule, GruposPermisosRoutingModule],
})
export class GruposPermisosModule {}
