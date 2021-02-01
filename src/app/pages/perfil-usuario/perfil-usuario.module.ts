import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { PerfilUsuarioPageComponent } from './containers/perfil-usuario-page/perfil-usuario-page.component';
import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { FormPerfilUsuarioComponent } from './components/form-perfil-usuario/form-perfil-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [PerfilUsuarioPageComponent, FormPerfilUsuarioComponent],
  imports: [
    CommonModule,
    SharedModule,
    PerfilUsuarioRoutingModule,
    SharedModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatExpansionModule,
  ],
})
export class PerfilUsuarioModule {}
