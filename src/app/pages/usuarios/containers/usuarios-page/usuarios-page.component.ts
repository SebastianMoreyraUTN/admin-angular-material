import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { buttons } from 'src/assets/table-buttons/table-buttons';
import { FormUsuariosComponent } from '../../components/form-usuarios/form-usuarios.component';
const DATA = [
  {
    nombre:'Sebastian',
    apellido:'Moreyra',
    email:'sm@gmail.com'
  },
  {
    nombre:'Alan',
    apellido:'Pieckenstainer',
    email:'a@gmail.com'
  },
  {
    nombre:'Franco',
    apellido:'Morini',
    email:'fm@gmail.com'
  },
  {
    nombre:'Hugo',
    apellido:'Bustos',
    email:'hb@gmail.com'
  },
  {
    nombre:'Elias',
    apellido:'Cuevas',
    email:'ec@gmail.com'
  }
  
]
@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.scss']
})
export class UsuariosPageComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido','email','editar','eliminar'];
  data:any[] = DATA;
  columnas= ['nombre','apellido','email','actualizado'];
  botonesTabla = [buttons.editar,buttons.eliminar];
  @ViewChild('scroll') formDiv: ElementRef;
  @ViewChild('form') form: FormUsuariosComponent
  constructor() { }

  ngOnInit(): void {
  }

  clickEnBotonFila(evento:any):void {
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
    console.log(evento.fila)
  }
  eliminarUsuario(fila:any) : void {
    console.log('eliminado');
  }
  editarUsuario(fila:any): void {
    this.form.mapearValores(fila);
    this.form.titulo = "Editar Reporte",
    this.form.modo = 'editar';
    this.scroll();
  }

  scroll() {
    this.formDiv.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

}
