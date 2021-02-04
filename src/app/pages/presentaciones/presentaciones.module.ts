import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PresentacionesPageComponent } from './containers/presentaciones-page/presentaciones-page.component';
import { PresentacionesRoutingModule } from './presentaciones-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';





@NgModule({
  declarations: [PresentacionesPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    PresentacionesRoutingModule,
    SharedModule,
    MatToolbarModule
  ]
})
export class PresentacionesModule { }
