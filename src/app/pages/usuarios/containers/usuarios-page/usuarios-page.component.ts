import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { buttons } from 'src/assets/table-buttons/table-buttons';
import Swal from 'sweetalert2';
import { FormUsuariosComponent } from '../../components/form-usuarios/form-usuarios.component';
const DATA = [
  {
    nombre: 'Sebastian',
    apellido: 'Moreyra',
    email: 'sm@gmail.com',
    grupos: ['desarrollo', 'soporte'],
  },
  {
    nombre: 'Alan',
    apellido: 'Pieckenstainer',
    email: 'a@gmail.com',
    grupos: ['rrhh', 'comercial'],
  },
  {
    nombre: 'Franco',
    apellido: 'Morini',
    email: 'fm@gmail.com',
  },
  {
    nombre: 'Hugo',
    apellido: 'Bustos',
    email: 'hb@gmail.com',
  },
  {
    nombre: 'Elias',
    apellido: 'Cuevas',
    email: 'ec@gmail.com',
  },
];
@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.scss'],
})
export class UsuariosPageComponent implements OnInit {
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'email',
    'editar',
    'eliminar',
  ];
  data: any[] = DATA;
  columnas = ['nombre', 'apellido', 'email', 'actualizado'];
  botonesTabla = [buttons.editar, buttons.eliminar];
  @ViewChild('scroll') formDiv: ElementRef;
  @ViewChild('form') form: FormUsuariosComponent;
  constructor() {}

  ngOnInit(): void {}

  clickEnBotonFila(evento: any): void {
    switch (evento.button.name) {
      case 'editar':
        this.editarUsuario(evento.fila);
        break;
      case 'eliminar':
        this.eliminarUsuario(evento.fila);
        break;
      default:
        break;
    }
    console.log(evento.fila);
  }
  eliminarUsuario(fila: any): void {
    Swal.fire({
      title: 'Advertencia',
      text: `Desea eliminar a ${fila.nombre} ${fila.apellido} ?`,
      showCancelButton: true,
      confirmButtonText: `Confirmar`,
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('', 'El usuario se ha eliminado con éxito', 'success');
        console.log('eliminado');
      }
    });
  }
  editarUsuario(fila: any): void {
    this.form.mapearValores(fila);
    this.scroll();
  }

  nuevoUsuario() {
    this.form.limpiarValores();
    this.scroll();
  }

  scroll() {
    this.formDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
