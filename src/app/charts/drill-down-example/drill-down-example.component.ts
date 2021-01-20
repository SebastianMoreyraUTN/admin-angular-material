import { Component, Input, NgZone } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-drill-down-example',
  templateUrl: './drill-down-example.component.html',
  styleUrls: ['./drill-down-example.component.scss'],
})
export class DrillDownExampleComponent {
  @Input() data: any;
  @Input() category: string;
  @Input() value: string;
  @Input() title: string;
  actualNavName: string;

  nav: am4charts.NavigationBar;
  series: am4charts.ColumnSeries;
  chart: am4charts.XYChart;
  categoryAxis: am4charts.CategoryAxis<am4charts.AxisRenderer>;

  constructor(private zone: NgZone) {}

  //Esto se debe a que estoy creando una vista externa al view del component.
  //Se ejecuta una vez que se cargan todas las vistas del componente y sus hijos.
  ngAfterViewInit() {
    console.log(this.data);
    // Chart code goes in here
    am4core.useTheme(am4themes_animated);
    //To stop change detection
    /* Según lo que entendí, utiliza esto porque los eventos que se ejecutan para
       detectar cambios son muy costos en cuestiones de performance*/
    //It is recommended that all amCharts operations be run outside of Angular.
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.data = this.data;
      let title = chart.titles.create();
      title.text = this.title;
      this.chart = chart;
      chart.legend = new am4charts.Legend();
      chart.exporting.menu = new am4core.ExportMenu();
      chart.scrollbarX = new am4core.Scrollbar();
      chart.responsive.enabled = true;

      //Creating nav
      this.nav = chart.createChild(am4charts.NavigationBar);
      this.nav.data = [{ name: this.title }];
      this.nav.toBack();

      //Setting Axis and Series
      this.setAxis();
      this.setSeries();

      //Handling nav functionality
      this.setNavClickEvent();

      //Setting Responsiveness
      this.setResponsiveness();
    });
  }

  setSeries() {
    this.series = this.chart.series.push(new am4charts.ColumnSeries());
    this.series.dataFields.categoryX = this.category;
    this.series.dataFields.valueY = this.value;
    this.series.name = this.value;
    this.series.columns.template.cursorOverStyle =
      am4core.MouseCursorStyle.pointer;
    this.series.columns.template.tooltipText =
      'Area: {categoryX} \n Sales {valueY} {name}';
    this.series.columns.template.events.on('hit', (ev: any) => {
      this.chart.colors.reset();
      let linkData = ev.target.dataItem.dataContext;
      this.actualNavName = linkData[this.series.dataFields.categoryX];
      if (linkData.sub) {
        this.chart.data = linkData.sub;
        this.nav.data.push({
          name: ev.target.populateString(
            this.actualNavName.charAt(0).toUpperCase() +
              this.actualNavName.slice(1)
          ),
          step: ev.target.dataItem.dataContext,
          category: Object.keys(linkData.sub[0])[0],
        });
        this.series.dataFields.categoryX = Object.keys(linkData.sub[0])[0];
        this.categoryAxis.title.text = Object.keys(linkData.sub[0])[0];
        this.categoryAxis.dataFields.category = Object.keys(linkData.sub[0])[0];
        this.nav.invalidateData();
      }
    });
  }

  setAxis() {
    this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    this.categoryAxis.title.text = this.category;
    this.categoryAxis.dataFields.category = this.category;

    let valueAxisY = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.title.text = this.value;
    valueAxisY.renderer.minWidth = 20;
  }

  setNavClickEvent() {
    this.nav.links.template.events.on('hit', (ev: any) => {
      let target = ev.target.dataItem.dataContext;
      let nav = ev.target.parent;
      this.chart.colors.reset();
      if (target.step) {
        this.series.dataFields.categoryX = target.category;
        this.categoryAxis.title.text = target.category;
        this.categoryAxis.dataFields.category = target.category;
        this.chart.data = target.step.sub;
        nav.data.splice(nav.data.indexOf(target) + 1);
        nav.invalidateData();
      } else {
        this.chart.data = this.data;
        nav.data = [{ name: 'Home' }];
        this.series.dataFields.categoryX = this.category;
        this.categoryAxis.title.text = this.category;
        this.categoryAxis.dataFields.category = this.category;
      }
    });
  }

  setResponsiveness(){
    /**
 * ========================================================
 * Enabling responsive features
 * ========================================================
 */

this.chart.responsive.useDefault = false
this.chart.responsive.enabled = true;

this.chart.responsive.rules.push({
  relevant: function(target) {
    if (target.pixelWidth <= 400) {
      return true;
    }
    
    return false;
  },
  state: function(target, stateId) {
    if (target instanceof am4charts.Chart) {
      var state = target.states.create(stateId);
      state.properties.paddingTop = 5;
      state.properties.paddingRight = 15;
      state.properties.paddingBottom = 5;
      state.properties.paddingLeft = 0;
      return state;
    }
    return null;
  }
});
  }
  //Para borrar el chart una vez que la instancia es destruida.
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
