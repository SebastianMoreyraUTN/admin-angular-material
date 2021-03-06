import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { buttons } from 'src/assets/table-buttons/table-buttons';
import Swal from 'sweetalert2';
import { FormUsuariosComponent } from '../../components/form-usuarios/form-usuarios.component';
import { UsuariosService } from '../../services/usuarios.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../../../models/usuario.model';
import { TableComponent } from 'src/app/shared/table/table.component';

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
  columnas = ['nombre', 'apellido', 'email', 'actualizado'];
  usuarios: Observable<Usuario[]>;
  botonesTabla = [buttons.editar, buttons.eliminar];

  /*
    Referencia al contenedor del form para hacer scroll
    cuando se hace click en Nuevo Usuario  
  */
  @ViewChild('scroll') formDiv: ElementRef;

  /*
    Referencia al form de usuario para poder ejecutar sus métodos
    en caso de necesitar un reset de sus valores o mapear los datos
    cuando se desea editar un usuario.
  */
  @ViewChild('form') form: FormUsuariosComponent;
  /*
    Referencia a la tabla de usuarios para poder actualizar sus datos
    al realizar alta/baja/modificación
  */
  @ViewChild('table') table: TableComponent;

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getUsuarios();
  }

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
        this.table.data = this.usuarioService.getUsuariosOnDelete();
        this.actualizarTablaUsuarios();
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

  actualizarTablaUsuarios() {
    //hacer llamada con el servicio
    this.table.loadData();
  }
}
