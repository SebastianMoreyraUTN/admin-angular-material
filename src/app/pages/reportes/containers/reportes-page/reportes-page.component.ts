import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { buttons } from '../../../../../assets/table-buttons/table-buttons';
import { FormReportesComponent } from '../../components/form-reportes/form-reportes.component';

const ELEMENT_DATA: any = [
  {
    nombre: 'Cartera Fecha',
    url: 'http://transactor.grupounion.com.ar:780/api.php',
    consulta: 'CarteraFecha',
    actualizado: '00/00/0000',
    hash: 'hash',
    actualizacion: 'manual',
  },
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
  displayedColumns: string[] = [
    'nombre',
    'url',
    'consulta',
    'actualizado',
    'editar',
    'eliminar',
    'actualizar',
  ];
  data: any[] = ELEMENT_DATA;
  columnas = ['nombre', 'url', 'consulta', 'actualizado'];
  botonesTabla = [buttons.editar, buttons.actualizar, buttons.eliminar];
  @ViewChild('scroll') formDiv: ElementRef;
  @ViewChild('form') form: FormReportesComponent;

  constructor() {}

  ngOnInit(): void {}

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
}
