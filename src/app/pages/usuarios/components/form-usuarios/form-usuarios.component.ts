import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DualMultiselectComponent } from '../../../../shared/dual-multiselect/dual-multiselect.component';

const GRUPOS = [
  'desarrollo',
  'soporte',
  'comercial',
  'riesgo',
  'operaciones',
  'gerencia',
];

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss'],
})
export class FormUsuariosComponent implements OnInit {
  grupos: any[] = GRUPOS;
  usuarioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  titulo: string = 'Crear Usuario';
  modo: string = 'crear';
  @ViewChild('multiselect') multiselect: DualMultiselectComponent;
  constructor() {}

  ngOnInit(): void {}

  mostrarError(formControl) {
    if (formControl.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    if (formControl.hasError('email')) {
      return 'Debe ingresar un formato de email válido';
    }
  }

  mapearValores(fila: any): void {
    this.titulo = 'Editar Usuario';
    this.modo = 'editar';
    this.usuarioForm.patchValue({
      nombre: fila.nombre,
      apellido: fila.apellido,
      email: fila.email,
    });
    this.multiselect.mapearValores(fila.grupos);
  }

  limpiarValores() {
    this.usuarioForm.reset('');
    this.titulo = 'Crear Usuario';
    this.modo = 'crear';
    console.log(this.usuarioForm.value);
  }

  guardarUsuario() {
    console.log(this.usuarioForm.value);
    console.log(this.multiselect.seleccionados);
    if (this.validarGruposSeleccionados()) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'El Usuario ha sido guardado correctamente',
        showConfirmButton: true,
        showCloseButton: true,
      });
    }
  }

  validarGruposSeleccionados() {
    if (this.multiselect.seleccionados.length > 0) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No has asignado ningún grupo al usuario!+',
      });
      return false;
    }
  }
}
