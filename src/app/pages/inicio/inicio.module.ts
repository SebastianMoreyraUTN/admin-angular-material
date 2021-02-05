import { NgModule } from '@angular/core';
import { InicioPageComponent } from './containers/inicio-page/inicio-page.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardBadgeComponent } from './components/card-badge/card-badge.component';

@NgModule({
  declarations: [InicioPageComponent, CardBadgeComponent],
  imports: [InicioRoutingModule, SharedModule],
})
export class InicioModule {}
