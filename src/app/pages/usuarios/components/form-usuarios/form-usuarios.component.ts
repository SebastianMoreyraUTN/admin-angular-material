import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DualMultiselectComponent } from '../../../../shared/dual-multiselect/dual-multiselect.component';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss'],
})
export class FormUsuariosComponent implements OnInit {
  usuarioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
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
  }

  mapearValores(fila: any): void {
    this.usuarioForm.patchValue({
      nombre: fila.nombre,
      apellido: fila.apellido,
      email: fila.email,
    });
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
