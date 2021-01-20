import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PresentacionesPageComponent } from './containers/presentaciones-page/presentaciones-page.component';
import { PresentacionesRoutingModule } from './presentaciones-routing.module';





@NgModule({
  declarations: [PresentacionesPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    PresentacionesRoutingModule,
    SharedModule
  ]
})
export class PresentacionesModule { }