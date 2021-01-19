import { Component, Inject, Input, NgZone } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import theme from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_material from "@amcharts/amcharts4/themes/material";




@Component({
  selector: 'app-my-first-chart',
  templateUrl: './my-first-chart.component.html',
  styleUrls: ['./my-first-chart.component.scss']
})
export class MyFirstChartComponent  {
  
  private chart: am4charts.XYChart;
  dark:boolean = true;
  @Input() id:string='line-chart';

  constructor(private zone: NgZone) { }

  ngOnInit() {

  }

  //Esto se debe a que estoy creando una vista externa al view del component.
  //Se ejecuta una vez que se cargan todas las vistas del componente y sus hijos.
  ngAfterViewInit() {
    // Chart code goes in here
    //To stop change detection
    /* Según lo que entendí, utiliza esto porque los eventos que se ejecutan para
       detectar cambios son muy costos en cuestiones de performance*/
    //It is recommended that all amCharts operations be run outside of Angular.
    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create(this.id, am4charts.XYChart);
      console.log(this.id)
      let title = chart.titles.create();
      title.text = "Productos por Ciudad";

      let data = [
        { "area": "Rosario", "computadoras": 20, "autos": 50, "botes": 10 },
        { "area": "San Genaro", "computadoras": 10, "autos": 10, "botes": 0 },
        { "area": "Roldan", "computadoras": 12, "autos": 5, "botes": 3 },
        { "area": "Funes", "computadoras": 30, "autos": 60, "botes": 6 },
      ];
      chart.data = data;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.title.text = "Area";
      categoryAxis.dataFields.category = "area";

      let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = "Sales";
      valueAxisY.renderer.minWidth = 20;

      let seriesNames = ["computadoras","autos","botes"];
      for(let i=0;i<3;i++) {
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX ="area";
        series.dataFields.valueY = seriesNames[i];
        series.name = seriesNames[i];

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.tooltipText="Area: {categoryX} \n Sales {valueY} {name}";
      }
      chart.legend = new am4charts.Legend();
      chart.exporting.menu = new am4core.ExportMenu();
      chart.scrollbarX = new am4core.Scrollbar();
      chart.responsive.enabled = true;

      

      this.chart = chart;

      
    })
  }

  //Para borrar el chart una vez que la instancia es destruida.
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if(this.chart) {
        this.chart.dispose();
      }
    })
  }
}