import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UsuariosPageComponent } from './containers/usuarios-page/usuarios-page.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [UsuariosPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsuariosRoutingModule,
    MatToolbarModule
  ]
})
export class UsuariosModule { }
