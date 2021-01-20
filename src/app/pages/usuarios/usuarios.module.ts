import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UsuariosPageComponent } from './containers/usuarios-page/usuarios-page.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';



@NgModule({
  declarations: [UsuariosPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
