import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VistasPageComponent } from './containers/vistas-page/vistas-page.component';


const routes: Routes = [
  {
    path: '',
    component: VistasPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class VistasRoutingModule {
}
