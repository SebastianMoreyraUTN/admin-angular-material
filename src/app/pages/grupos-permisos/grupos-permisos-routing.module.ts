import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GruposPermisosPageComponent } from './containers/grupos-permisos-page/grupos-permisos-page.component';


const routes: Routes = [
  {
    path: '',
    component: GruposPermisosPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class GruposPermisosRoutingModule {
}
