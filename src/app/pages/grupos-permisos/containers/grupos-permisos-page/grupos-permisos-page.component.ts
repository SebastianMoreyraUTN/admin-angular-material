import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from 'src/app/models/grupo.model';
import { buttons } from 'src/assets/table-buttons/table-buttons';
import Swal from 'sweetalert2';
import { FormGruposPermisosComponent } from '../../components/form-grupos-permisos/form-grupos-permisos.component';
import { GruposPermisosService } from '../../services/grupos-permisos.service';
import { TableComponent } from '../../../../shared/table/table.component';

@Component({
  selector: 'app-grupos-permisos-page',
  templateUrl: './grupos-permisos-page.component.html',
  styleUrls: ['./grupos-permisos-page.component.scss'],
})
export class GruposPermisosPageComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'editar', 'eliminar'];
  grupos: Observable<Grupo[]>;
  columnas = ['nombre'];
  botonesTabla = [buttons.editar, buttons.eliminar];
  @ViewChild('form') form: FormGruposPermisosComponent;
  @ViewChild('scroll') formDiv: ElementRef;
  @ViewChild('table') table: TableComponent;
  constructor(private gruposPermisosService: GruposPermisosService) {}

  ngOnInit(): void {
    this.grupos = this.gruposPermisosService.getGrupos();
  }

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
        this.actualizarTablaGrupos();
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

  actualizarTablaGrupos() {
    this.table.loadData();
  }
}
