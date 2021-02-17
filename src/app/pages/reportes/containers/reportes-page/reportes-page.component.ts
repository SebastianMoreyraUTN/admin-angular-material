import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { buttons } from '../../../../../assets/table-buttons/table-buttons';
import { FormReportesComponent } from '../../components/form-reportes/form-reportes.component';
import { ReportesService } from '../../services/reportes.service';
import { Observable } from 'rxjs';
import { Reporte } from 'src/app/models/reporte.model';
import { TableComponent } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-reportes-page',
  templateUrl: './reportes-page.component.html',
  styleUrls: ['./reportes-page.component.scss'],
})
export class ReportesPageComponent implements OnInit {
  displayedColumns: string[] = [
    'nombre',
    'url',
    'consulta',
    'actualizado',
    'editar',
    'eliminar',
    'actualizar',
  ];
  reportes: Observable<Reporte[]> = this.reportesService.getReportes();
  columnas = ['nombre', 'url', 'consulta', 'actualizado'];
  botonesTabla = [buttons.editar, buttons.actualizar, buttons.eliminar];
  @ViewChild('scroll') formDiv: ElementRef;
  @ViewChild('form') form: FormReportesComponent;
  @ViewChild('table') table: TableComponent;

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.reportes = this.reportesService.getReportes();
  }

  clickEnBotonFila(evento: any) {
    switch (evento.button.name) {
      case 'editar':
        this.editarReporte(evento.fila);
        break;
      case 'actualizar':
        this.actualizarReporte(evento.fila);
        break;
      case 'eliminar':
        this.eliminarReporte(evento.fila);
        break;

      default:
        break;
    }
  }
  eliminarReporte(fila: any) {
    Swal.fire({
      title: 'Advertencia',
      text: `Desea eliminar el reporte "${fila.nombre}"?`,
      showCancelButton: true,
      confirmButtonText: `Confirmar`,
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('', 'El reporte se ha eliminado con éxito', 'success');
        this.table.loadData();
      }
    });
  }
  actualizarReporte(fila: any) {
    console.log(fila, 'actualizado');
  }

  editarReporte(fila: any) {
    this.form.mapearValores(fila);
    (this.form.titulo = 'Editar Reporte'), (this.form.modo = 'editar');
    this.scroll();
  }

  scroll() {
    this.formDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  nuevoReporte() {
    this.form.limpiarForm();
    this.scroll();
  }

  actualizarTablaReportes() {
    this.table.loadData();
  }
}
