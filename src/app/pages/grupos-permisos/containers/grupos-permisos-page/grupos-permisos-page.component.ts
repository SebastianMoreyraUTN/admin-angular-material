import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { buttons } from 'src/assets/table-buttons/table-buttons';
import Swal from 'sweetalert2';
import { FormGruposPermisosComponent } from '../../components/form-grupos-permisos/form-grupos-permisos.component';

const DATA = [
  {
    nombre: 'Grupo1',
    permisos: ['Tableros/Ver', 'Reportes'],
    reportes: ['Reporte1'],
  },
  { nombre: 'Grupo2', permisos: ['Tableros/Ver'], reportes: [] },
  {
    nombre: 'Grupo3',
    permisos: ['Tableros/Ver', 'Reportes'],
    reportes: ['Reporte2', 'Reporte3'],
  },
  {
    nombre: 'Grupo4',
    permisos: ['Tableros/Ver', 'Reportes'],
    reportes: ['Reporte2', 'Reporte3'],
  },
];

@Component({
  selector: 'app-grupos-permisos-page',
  templateUrl: './grupos-permisos-page.component.html',
  styleUrls: ['./grupos-permisos-page.component.scss'],
})
export class GruposPermisosPageComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'editar', 'eliminar'];
  data: any[] = DATA;
  columnas = ['nombre'];
  botonesTabla = [buttons.editar, buttons.eliminar];
  @ViewChild('form') form: FormGruposPermisosComponent;
  @ViewChild('scroll') formDiv: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  clickEnBotonFila(evento) {
    switch (evento.button.name) {
      case 'editar':
        this.editarGrupo(evento.fila);
        break;
      case 'eliminar':
        this.eliminarGrupo(evento.fila);
        break;

      default:
        break;
    }
  }

  editarGrupo(fila): void {
    console.log(fila);
    this.form.mapearValores(fila);
    this.scroll();
  }

  eliminarGrupo(fila): void {
    Swal.fire({
      title: 'Advertencia',
      text: `Desea eliminar el grupo "${fila.nombre}"?`,
      showCancelButton: true,
      confirmButtonText: `Confirmar`,
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('', 'El grupo se ha eliminado con éxito', 'success');
      }
    });
  }

  nuevoGrupo() {
    this.form.limpiarValores();
    this.scroll();
  }

  scroll() {
    this.formDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
