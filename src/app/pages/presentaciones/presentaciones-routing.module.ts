import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PresentacionesPageComponent } from './containers/presentaciones-page/presentaciones-page.component';



const routes: Routes = [
  {
    path: '',
    component: PresentacionesPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PresentacionesRoutingModule {
}
