import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: any = [
  { nombre: 'Cartera Fecha', url: 'http://transactor.grupounion.com.ar:780/api.php', consulta: 'CarteraFecha', actualizado: '00/00/0000' },
  { nombre: 'Reporte2', url: 'Helium', consulta: '4.0026', actualizado: 'He' },
  { nombre: 'Reporte3', url: 'Lithium', consulta: '6.941', actualizado: 'Li' },
  {
    nombre: 'Reporte4',
    url: 'Beryllium',
    consulta: '9.0122',
    actualizado: 'Be',
  },
  { nombre: 'Reporte5', url: 'Boron', consulta: '10.811', actualizado: 'B' },
  { nombre: 'Reporte6', url: 'Carbon', consulta: '12.010', actualizado: 'C' },
  { nombre: 'Reporte7', url: 'Nitrogen', consulta: '14.006', actualizado: 'N' },
  { nombre: 'Reporte8', url: 'Oxygen', consulta: '15.999', actualizado: 'O' },
  { nombre: 'Reporte9', url: 'Fluorine', consulta: '18.998', actualizado: 'F' },
  { nombre: 'Reporte10', url: 'Neon', consulta: '20.179', actualizado: 'Ne' },
];
@Component({
  selector: 'app-reportes-page',
  templateUrl: './reportes-page.component.html',
  styleUrls: ['./reportes-page.component.scss'],
})
export class ReportesPageComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'url', 'consulta', 'actualizado','editar','eliminar','actualizar'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
