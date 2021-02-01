import { Component, OnInit } from '@angular/core';
import { buttons } from 'src/assets/table-buttons/table-buttons';
import Swal from 'sweetalert2';

const DATA = [
  { nombre: 'Grupo1' },
  { nombre: 'Grupo2' },
  { nombre: 'Grupo3' },
  { nombre: 'Grupo4' },
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
}
