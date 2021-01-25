import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor() {}

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() data: any;
  @Input() displayedColumns: string[];
  @Input() buttons: any[];
  @Input() columnas: string[];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    console.log(this.displayedColumns);
    console.log(this.buttons);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.traducirPaginador();
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  traducirPaginador() {
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.dataSource.paginator._intl.lastPageLabel = 'Última págna';
    this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
    this.dataSource.paginator._intl.firstPageLabel = 'Primer página';
    this.dataSource.paginator._intl.previousPageLabel = 'Página previa';
 
    this.dataSource.paginator._intl.getRangeLabel =  (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `Mostrando 0 de ${length} elementos`; }
      
      length = Math.max(length, 0);
    
      const startIndex = page * pageSize;
    
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;
    
      return `Mostrando ${startIndex + 1} al ${endIndex} elementos de ${length}`;
    }
  }
}
