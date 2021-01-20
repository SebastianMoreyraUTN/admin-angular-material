import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InicioPageComponent } from './containers/inicio-page/inicio-page.component';


const routes: Routes = [
  {
    path: '',
    component: InicioPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class InicioRoutingModule {
}
