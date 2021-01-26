import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
  titulo:string = "Crear Usuario";
  modo:string = "crear";
  constructor() {}

  ngOnInit(): void {}

  mostrarError(formControl) {
    if(formControl.hasError('required')) {
      return 'Debe ingresar un valor'
    }
  }

  mapearValores(fila:any):void{
    this.usuarioForm.patchValue({
      nombre:fila.nombre,
      apellido: fila.apellido,
      email:fila.email,
    })
  }

  guardarUsuario() {
    console.log(this.usuarioForm.value);
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'El Usuario ha sido guardado correctamente',
      showConfirmButton: true,
      showCloseButton:true
    })
  }
}
