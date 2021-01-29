import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TemaService } from '../../../../services/tema.service';

@Component({
  selector: 'app-form-perfil-usuario',
  templateUrl: './form-perfil-usuario.component.html',
  styleUrls: ['./form-perfil-usuario.component.scss'],
})
export class FormPerfilUsuarioComponent implements OnInit {
  usuarioForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  isChecked: boolean = false;
  tema: string;
  constructor(private temaService: TemaService) {}

  ngOnInit(): void {
    this.temaService._getColorScheme();
    console.log(this.temaService.colorScheme);
    if (this.temaService.colorScheme === 'dark-theme') {
      this.isChecked = true;
      this.tema = 'Dark';
      this.temaService.update('dark-theme');
    } else {
      this.tema = 'Light';
    }
  }

  mostrarError(formControl) {
    if (formControl.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    if (formControl.hasError('email')) {
      return 'Debe ingresar un formato de email válido';
    }
  }

  mostrarIcono() {
    if (this.isChecked) {
      return 'dark_mode';
    }
    return 'light_mode';
  }

  guardarUsuario() {
    console.log(this.usuarioForm.value);
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'Tu Perfil ha sido guardado correctamente',
      showConfirmButton: true,
      showCloseButton: true,
    });
  }

  cambiarTema(): void {
    this.isChecked = !this.isChecked;
    console.log(this.isChecked);
    console.log('cambio');
    if (this.isChecked === true) {
      this.tema = 'Dark';
      this.temaService.update('dark-theme');
    } else {
      this.tema = 'Light';
      this.temaService.update('light-theme');
    }
  }
}
