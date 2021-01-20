import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsuariosPageComponent } from './containers/usuarios-page/usuarios-page.component';


const routes: Routes = [
  {
    path: '',
    component: UsuariosPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class UsuariosRoutingModule {
}
