import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GruposPermisosPageComponent } from './containers/grupos-permisos-page/grupos-permisos-page.component';
import { GruposPermisosRoutingModule } from './grupos-permisos-routing.module';
import { FormGruposPermisosComponent } from './components/form-grupos-permisos/form-grupos-permisos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [GruposPermisosPageComponent, FormGruposPermisosComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedModule,
    MatToolbarModule,
    GruposPermisosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class GruposPermisosModule {}
