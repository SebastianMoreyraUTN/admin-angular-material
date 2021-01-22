import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GruposPermisosPageComponent } from './containers/grupos-permisos-page/grupos-permisos-page.component';
import { GruposPermisosRoutingModule } from './grupos-permisos-routing.module';





@NgModule({
  declarations: [GruposPermisosPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedModule,
    MatToolbarModule,
    GruposPermisosRoutingModule
  ]
})
export class GruposPermisosModule { }