import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor() {}

  dataSource: MatTableDataSource<any>;
  delete = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  actualData: any[] = [];
  @Input() data: Observable<any>;
  @Input() displayedColumns: string[];
  @Input() buttons: any[];
  @Input() columnas: string[];

  @Output() clickBoton = new EventEmitter();

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data.subscribe((res) => {
      this.actualData = res;
      this.dataSource = new MatTableDataSource<any>(this.actualData);
      this.dataSource.paginator = this.paginator;
      this.traducirPaginador();
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  emitirEvento(fila: any, button: any): void {
    const evento = { fila, button };
    this.clickBoton.emit(evento);
  }

  traducirPaginador(): void {
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.dataSource.paginator._intl.lastPageLabel = 'Última págna';
    this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
    this.dataSource.paginator._intl.firstPageLabel = 'Primer página';
    this.dataSource.paginator._intl.previousPageLabel = 'Página previa';

    this.dataSource.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length == 0 || pageSize == 0) {
        return `Mostrando 0 de ${length} elementos`;
      }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;

      return `Mostrando ${
        startIndex + 1
      } al ${endIndex} elementos de ${length}`;
    };
  }

  getPageSize(): any[] {
    if (this.actualData.length <= 5) {
      return [5];
    }
    if (this.actualData.length <= 10) {
      return [5, this.actualData.length];
    }
    if (this.actualData.length <= 20) {
      return [5, 10, this.actualData.length];
    }
    return [5, 10, 20, this.actualData.length];
  }
}
