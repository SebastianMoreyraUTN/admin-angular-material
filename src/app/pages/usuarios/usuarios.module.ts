import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UsuariosPageComponent } from './containers/usuarios-page/usuarios-page.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTab, MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [UsuariosPageComponent, FormUsuariosComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
  ],
})
export class UsuariosModule {}
