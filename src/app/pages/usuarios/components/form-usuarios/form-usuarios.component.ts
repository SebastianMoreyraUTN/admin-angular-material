import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { DualMultiselectComponent } from '../../../../shared/dual-multiselect/dual-multiselect.component';
import { GruposPermisosService } from '../../../grupos-permisos/services/grupos-permisos.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss'],
})
export class FormUsuariosComponent implements OnInit {
  usuarioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmarPassword: new FormControl('', [Validators.required]),
  });
  titulo = 'Crear Usuario';
  modo = 'crear';
  grupos: any[] = [];
  usuarioActual: any;
  @Output() submitUsuario = new EventEmitter();
  @ViewChild('multiselect') multiselect: DualMultiselectComponent;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private gruposPermisosService: GruposPermisosService) {}

  ngOnInit(): void {
    this.gruposPermisosService.getGrupos().subscribe((res) => {
      this.grupos = res;
    });
  }

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
      password: '',
      confirmPassword: '',
    });
    this.eliminarPasswordValidators();
    this.multiselect.mapearValores(fila.grupos);
  }

  limpiarValores() {
    this.formGroupDirective.resetForm('');
    this.titulo = 'Crear Usuario';
    this.modo = 'crear';
    this.multiselect.limpiar();
    this.agregarPasswordValidators();
  }

  guardarUsuario() {
    this.usuarioForm.clearValidators();
    if (
      this.usuarioForm.get('password').value !=
      this.usuarioForm.get('confirmarPassword').value
    ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops',
        text: 'Las contraseñas deben coincidir',
        showConfirmButton: true,
        showCloseButton: true,
      });
      return;
    }
    if (this.validarGruposSeleccionados()) {
      this.usuarioActual = {
        nombre: this.usuarioForm.get('nombre').value,
        apellido: this.usuarioForm.get('apellido').value,
        email: this.usuarioForm.get('email').value,
        password: this.usuarioForm.get('password').value,
        grupos: this.grupos,
      };
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'El Usuario ha sido guardado correctamente',
        showConfirmButton: true,
        showCloseButton: true,
      });
      this.submitUsuario.emit(this.usuarioActual);
    }
  }

  validarGruposSeleccionados() {
    if (this.multiselect.seleccionados.length > 0) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No has asignado ningún grupo al usuario!',
      });
      return false;
    }
  }

  eliminarPasswordValidators() {
    this.usuarioForm.get('password').clearValidators();
    this.usuarioForm.get('password').updateValueAndValidity();
    this.usuarioForm.get('confirmarPassword').clearValidators();
    this.usuarioForm.get('confirmarPassword').updateValueAndValidity();
  }

  agregarPasswordValidators() {
    this.usuarioForm.get('password').setValidators([Validators.required]);
    this.usuarioForm.get('password').updateValueAndValidity();
    this.usuarioForm
      .get('confirmarPassword')
      .setValidators([Validators.required]);
    this.usuarioForm.get('confirmarPassword').updateValueAndValidity();
  }

  validarCamposAlEditar() {
    if (this.modo === 'editar') {
      if (
        (!this.usuarioForm.get('password').value &&
          this.usuarioForm.get('confirmarPassword').value) ||
        (this.usuarioForm.get('password').value &&
          !this.usuarioForm.get('confirmarPassword').value)
      ) {
        this.agregarPasswordValidators();
      } else {
        this.eliminarPasswordValidators();
      }
    }
  }
}
