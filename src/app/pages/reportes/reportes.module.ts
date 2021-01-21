import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReportesPageComponent } from './containers/reportes-page/reportes-page.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';




@NgModule({
  declarations: [ReportesPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportesRoutingModule,
    MatToolbarModule
  ]
})
export class ReportesModule { }