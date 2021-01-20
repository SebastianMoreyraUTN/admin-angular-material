import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReportesPageComponent } from './containers/reportes-page/reportes-page.component';
import { ReportesRoutingModule } from './reportes-routing.module';




@NgModule({
  declarations: [ReportesPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }