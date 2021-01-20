import { Component, Input, OnInit, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-drill-down-column-bar',
  templateUrl: './drill-down-column-bar.component.html',
  styleUrls: ['./drill-down-column-bar.component.scss']
})
export class DrillDownColumnBarComponent implements OnInit {
  @Input() data: any;
  @Input() category: string;
  @Input() value: string;
  @Input() title: string;
  @Input() drillDowns:any[];
  @Input() values:any[];
  @Input() id:string = 'column-bar';
  actualNavName: string;


  nav: am4charts.NavigationBar;
  series: am4charts.ColumnSeries;
  chart: am4charts.XYChart;
  categoryAxis: am4charts.CategoryAxis<am4charts.AxisRenderer>;
  actualDrillDown:number = 0;
  
  constructor(private ngZone: NgZone, private dataService:DataService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    setTimeout(()=> {
      am4core.useTheme(am4themes_animated);

    this.ngZone.runOutsideAngular(() => {
      let chart = am4core.create(this.id,am4charts.XYChart);
      chart.data = this.data;    
      let title = chart.titles.create();
      title.text = this.title;      
      chart.legend = new am4charts.Legend();
      chart.exporting.menu = new am4core.ExportMenu();
      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarY = new am4core.Scrollbar();
      chart.responsive.enabled = true;
      chart.numberFormatter.numberFormat = "#a";
      chart.cursor = new am4charts.XYCursor;
      //chart.cursor.behavior = 'none';
      this.chart = chart;

      //Creating nav
      this.nav = chart.createChild(am4charts.NavigationBar);
      this.nav.data = [{ name: this.title }];
      this.nav.toBack();

      //Setting Axis and Series
      this.setAxis();
      //this.setSeries();
      this.setMultipleSeries();
      //Handling nav functionality
      this.setNavClickEvent();

      //Setting Responsiveness
      //this.setResponsiveness();
      
    })

    }, 300)
    
  }
  setAxis() {
    this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    this.categoryAxis.title.text = this.category;
    this.categoryAxis.dataFields.category = this.category;
    

    let label = this.categoryAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 300;
    label.tooltipText =  "{category}";
    this.categoryAxis.events.on("sizechanged", (ev) => {
      this.handleSize();
    });
    this.categoryAxis.events.on("datarangechanged",(ev) => {
      this.handleSize();
    })
    

    let valueAxisY = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.title.text = this.value;
    valueAxisY.renderer.minWidth = 20;
  }

  setSeries() {
    
    this.series = this.chart.series.push(new am4charts.ColumnSeries());
    this.series.dataFields.categoryX = this.category;
    this.series.dataFields.valueY = this.value;
    this.series.columns.template.tooltipText =
      '{categoryX} \n {name} : {valueY} ';
    this.series.name = this.value;
    this.series.columns.template.cursorOverStyle =
      am4core.MouseCursorStyle.pointer;
      /*
    this.series.columns.template.tooltipText =
      'Area: {categoryX} \n Sales {valueY} {name}';
      */
    this.series.columns.template.events.on('hit', (ev: any) => {
      this.chart.colors.reset();

      if(!(this.actualDrillDown >= this.drillDowns.length)) {
        let actualData = this.drillDowns[this.actualDrillDown].data.filter( (obj) => {
          if(this.drillDownFilter(obj,ev.target.dataItem.dataContext)) {
            return obj;
          }
      })
        this.chart.data = actualData;
        let actualCategory = this.drillDowns[this.actualDrillDown].campo;
        
        //Se vuelven a setear los axis y la serie.
        this.series.dataFields.categoryX = actualCategory;
        this.categoryAxis.title.text = actualCategory;
        this.categoryAxis.dataFields.category = actualCategory;

        if(this.actualDrillDown===0) {
          this.actualNavName = ev.target.dataItem.dataContext[this.category]
        }
        else {
          this.actualNavName =  ev.target.dataItem.dataContext[this.drillDowns[this.actualDrillDown-1].campo];
        }
        this.nav.data.push({
  
          //name es el texto del nav-link
          name: this.actualNavName,
          
          //step son los datos que obtengo de la porcion que seleccione.
          step: actualData,
          category: actualCategory
        });
        this.nav.invalidateData();
        this.actualDrillDown ++;

      }
      
    });
  }

  drillDownFilter(obj: any, dataContext: any) {
    if(obj[this.category] === dataContext[this.category]) {
      for (let index = 0; index < this.actualDrillDown; index ++) {
        if(obj[this.drillDowns[index].campo] != dataContext[this.drillDowns[index].campo]) {
          return false
        }
      }      
      return true;
    }
    return false
  }

  setNavClickEvent(): void {
    this.nav.links.template.events.on('hit', (ev: any) => {
      let target = ev.target.dataItem.dataContext; //Es el nav.data
      let nav = ev.target.parent; //Es el navigation bar
      this.chart.colors.reset();

      //Si tengo datos en el nav
      if (target.step) {
        this.chart.data = target.step;
        this.actualDrillDown = nav.data.indexOf(target) -1;
        for (let index = 0; index < this.chart.series.values.length; index++) {
          this.chart.series.values[index].dataFields.categoryX = this.drillDowns[this.actualDrillDown].campo;
          
        }
        this.categoryAxis.title.text =  this.drillDowns[this.actualDrillDown].campo;
        this.categoryAxis.dataFields.category =  this.drillDowns[this.actualDrillDown].campo;
        this.actualDrillDown ++;

        //Me elimina la ultima hoja del arbol del nav.
        nav.data.splice(nav.data.indexOf(target) + 1);

        nav.invalidateData();
      } else {
        this.chart.data = this.data;
        nav.data = [{ name: this.title }];
        for (let index = 0; index < this.chart.series.values.length; index++) {
          this.chart.series.values[index].dataFields.categoryX = this.category;
          
        }
        this.categoryAxis.title.text =  this.category;
        this.categoryAxis.dataFields.category =  this.category;
        this.actualDrillDown = 0;
      }
      
    });
    this.handleSize();
  }

  setMultipleSeries(){
    for(let i:number = 0; i < this.values.length; i ++ ) {
      let series = new am4charts.ColumnSeries();
      series.dataFields.categoryX = this.category;
      series.dataFields.valueY = this.values[i];
      series.tooltipText =
        '{valueY}';
      series.tooltip.label.maxWidth= 90;
      series.tooltip.label.truncate = true;
      series.tooltip.pointerOrientation = "vertical";
      series.name = this.values[i];  
      series.showOnInit = false;
      series.columns.template.cursorOverStyle =
      am4core.MouseCursorStyle.pointer;
      this.chart.series.push(series);

    }

    for(let i:number = 0; i < this.chart.series.length; i ++) {   
      this.chart.series.values[i]["columns"].template.events.on('hit', (ev: any) => {
      this.chart.colors.reset();
  
        if(!(this.actualDrillDown >= this.drillDowns.length)) {
          let actualData = this.drillDowns[this.actualDrillDown].data.filter( (obj) => {
            if(this.drillDownFilter(obj,ev.target.dataItem.dataContext)) {
              return obj;
            }
        })
          this.chart.data = actualData;
          let actualCategory = this.drillDowns[this.actualDrillDown].campo;
          
          //Se vuelven a setear los axis y la serie.
          for (let index = 0; index < this.chart.series.length; index++) {
            this.chart.series.values[index].dataFields.categoryX = actualCategory;       
          }
          
          this.categoryAxis.title.text = actualCategory;
          this.categoryAxis.dataFields.category = actualCategory;
  
          if(this.actualDrillDown===0) {
            this.actualNavName = ev.target.dataItem.dataContext[this.category]
          }
          else {
            this.actualNavName =  ev.target.dataItem.dataContext[this.drillDowns[this.actualDrillDown-1].campo];
          }
          this.nav.data.push({
    
            //name es el texto del nav-link
            name: this.actualNavName,
            
            //step son los datos que obtengo de la porcion que seleccione.
            step: actualData,
            category: actualCategory
          });
          this.handleSize();
          this.nav.invalidateData();
          this.actualDrillDown ++;
        }
        
      });
    }
    
  }

  handleSize() {
    let axis = this.categoryAxis;
    let cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
    if (cellWidth < axis.renderer.labels.template.maxWidth) {
      axis.renderer.labels.template.rotation = -45;
      axis.renderer.labels.template.horizontalCenter = "right";
      axis.renderer.labels.template.verticalCenter = "middle";
    }
    else {
      axis.renderer.labels.template.rotation = 0;
      axis.renderer.labels.template.horizontalCenter = "middle";
      axis.renderer.labels.template.verticalCenter = "top";
      }
  }
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if(this.chart) {
        this.chart.dispose();
      }
    })
  }
}
