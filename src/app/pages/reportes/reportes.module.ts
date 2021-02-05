import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReportesPageComponent } from './containers/reportes-page/reportes-page.component';
import { ReportesRoutingModule } from './reportes-routing.module';

import { FormReportesComponent } from './components/form-reportes/form-reportes.component';

@NgModule({
  declarations: [ReportesPageComponent, FormReportesComponent],
  imports: [SharedModule, ReportesRoutingModule],
})
export class ReportesModule {}
