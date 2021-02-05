import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsuariosPageComponent } from './containers/usuarios-page/usuarios-page.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';

@NgModule({
  declarations: [UsuariosPageComponent, FormUsuariosComponent],
  imports: [SharedModule, UsuariosRoutingModule],
})
export class UsuariosModule {}
