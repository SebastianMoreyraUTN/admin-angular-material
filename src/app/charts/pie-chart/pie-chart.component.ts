import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() data: any[];
  @Input() category: string;
  @Input() value: string;
  @Input() title: string;
  @Input() drillDowns: any[];
  actualNavName: string;
  dark = false;
  actualDrillDown = 0;
  @Input()id = 'piechart';

  nav: am4charts.NavigationBar;
  pieSeries: am4charts.PieSeries;
  chart: am4charts.PieChart;

  constructor(private ngZone: NgZone, private dataService: DataService) {}

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_animated);
      const chart = am4core.create(this.id, am4charts.PieChart);
      /*
      this.dataService.getData().subscribe(data=>{
        this.data = data;
        chart.data = data;
      });
      */
      const title = chart.titles.create();
      title.text = this.title;
      this.chart = chart;
      chart.legend = new am4charts.Legend();
      chart.responsive.enabled = true;
      chart.exporting.menu = new am4core.ExportMenu();
      chart.numberFormatter.numberFormat = '#a';



      // Creating nav
      this.nav = chart.createChild(am4charts.NavigationBar);
      this.nav.data = [{ name: this.title }];
      this.nav.toBack();

      // Setting series
      this.setSeries();

      // Handling nav functionality
      this.setNavClickEvent();

      this.setResponsiveness();
    });
  }

  setSeries(): void {

    // Setting PieSeries initial value
    this.pieSeries = this.chart.series.push(new am4charts.PieSeries());
    this.pieSeries.labels.template.maxWidth = 200;
    this.pieSeries.labels.template.truncate = true;
    this.pieSeries.dataFields.value = this.value;
    this.pieSeries.dataFields.category = this.category;
    this.pieSeries.slices.template.cursorOverStyle =
      am4core.MouseCursorStyle.pointer;
    this.pieSeries.slices.template.tooltipText = this.pieSeries.slices.template.tooltipText +
                                                 '\n drill-down';

    // Configure slice-click
    this.configureSliceClick();

  }

  configureSliceClick() {
    this.pieSeries.slices.template.events.on('hit', (ev: any) => {
      this.chart.colors.reset();

      if (!(this.actualDrillDown >= this.drillDowns.length)){
        // Initialize drill-down data
        const actualData = this.drillDowns[this.actualDrillDown].data.filter( (obj) => {
          if (this.drillDownFilter(obj, ev.target.dataItem.dataContext)) {
            return obj;
          }
       });

        // Change chart data
        this.chart.data = actualData;
        // Change pieSeries category

        const actualCategory = this.drillDowns[this.actualDrillDown].campo;
        this.pieSeries.dataFields.category = actualCategory;



        // Set Nav label with selected slice category value

        if (this.actualDrillDown === 0) {
          this.actualNavName = ev.target.dataItem.dataContext[this.category];
        }
        else {
          this.actualNavName =  ev.target.dataItem.dataContext[this.drillDowns[this.actualDrillDown - 1].campo];
        }

        this.nav.data.push({

          // name es el texto del nav-link
          name: this.actualNavName,

          // step son los datos que obtengo de la porcion que seleccione.
          step: actualData,
          category: actualCategory
        });

        this.nav.invalidateData();
        this.actualDrillDown ++;
      }
    });
  }

  drillDownFilter(obj: any, dataContext: any) {
    if (obj[this.category] === dataContext[this.category]) {
      for (let index = 0; index < this.actualDrillDown; index ++) {
        if (obj[this.drillDowns[index].campo] != dataContext[this.drillDowns[index].campo]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  setNavClickEvent(): void {
    this.nav.links.template.events.on('hit', (ev: any) => {
      const target = ev.target.dataItem.dataContext; // Es el nav.data
      const nav = ev.target.parent; // Es el navigation bar
      this.chart.colors.reset();

      // Si tengo datos en el nav
      if (target.step) {
        this.chart.data = target.step;
        this.actualDrillDown = nav.data.indexOf(target) - 1;
        this.pieSeries.dataFields.category = this.drillDowns[this.actualDrillDown].campo;
        this.actualDrillDown ++;

        // Me elimina la ultima hoja del arbol del nav.
        nav.data.splice(nav.data.indexOf(target) + 1);

        nav.invalidateData();
      } else {
        this.chart.data = this.data;
        nav.data = [{ name: this.title }];
        this.pieSeries.dataFields.category = this.category;
        this.actualDrillDown = 0;
      }
    });
  }

  setResponsiveness(): void {
    this.chart.responsive.enabled = true;
    this.chart.responsive.rules.push({
      relevant(target) {
        if (target.pixelWidth <= 700) {
          return true;
        }
        return false;
      },
      state(target, stateId) {
        if (target instanceof am4charts.PieSeries) {
          const state = target.states.create(stateId);

          const labelState = target.labels.template.states.create(stateId);
          labelState.properties.disabled = true;

          const tickState = target.ticks.template.states.create(stateId);
          tickState.properties.disabled = true;
          return state;
        }

        return null;
      },
    });
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
