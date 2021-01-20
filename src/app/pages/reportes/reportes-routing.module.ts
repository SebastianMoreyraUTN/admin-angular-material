import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportesPageComponent } from './containers/reportes-page/reportes-page.component';


const routes: Routes = [
  {
    path: '',
    component:ReportesPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ReportesRoutingModule {
}
