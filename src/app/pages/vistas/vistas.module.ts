import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { VistasRoutingModule } from './vistas-routing.module';
import { VistasPageComponent } from './containers/vistas-page/vistas-page.component';




@NgModule({
  declarations: [VistasPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    VistasRoutingModule
  ]
})
export class VistasModule { }