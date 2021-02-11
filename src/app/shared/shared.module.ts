import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderModule } from './header/header.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { TableComponent } from './table/table.component';
import { DualMultiselectComponent } from './dual-multiselect/dual-multiselect.component';
import { MaterialModule } from '../angular-material/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    TableComponent,
    DualMultiselectComponent,
  ],
  imports: [
    HeaderModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    CommonModule,
    HeaderModule,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    TableComponent,
    DualMultiselectComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
})
export class SharedModule {}
