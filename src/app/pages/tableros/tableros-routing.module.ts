import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TablerosPageComponent } from './containers/tableros-page/tableros-page.component';



const routes: Routes = [
  {
    path: '',
    component: TablerosPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class TablerosRoutingModule {
}
