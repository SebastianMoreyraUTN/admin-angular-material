import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { InicioPageComponent } from './containers/inicio-page/inicio-page.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardBadgeComponent } from './components/index';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    InicioPageComponent,
    CardBadgeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    InicioRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class InicioModule { }
