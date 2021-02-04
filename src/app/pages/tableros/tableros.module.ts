import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TablerosPageComponent } from './containers/tableros-page/tableros-page.component';
import { TablerosRoutingModule } from './tableros-routing.module';






@NgModule({
  declarations: [TablerosPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    TablerosRoutingModule
  ]
})
export class TablerosModule { }
