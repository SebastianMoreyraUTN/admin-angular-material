import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MyFirstChartComponent } from './my-first-chart/my-first-chart.component';
import { DrillDownColumnBarComponent } from './drill-down-column-bar/drill-down-column-bar.component';
import { DrillDownExampleComponent } from './drill-down-example/drill-down-example.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    DialogComponent, MyFirstChartComponent, DrillDownColumnBarComponent, DrillDownExampleComponent, PieChartComponent
  ],
  imports: [
    MatDialogModule
  ],
  exports: [
    DialogComponent, MyFirstChartComponent, DrillDownColumnBarComponent, DrillDownExampleComponent, PieChartComponent
  ]
})
export class ChartsModule { }
