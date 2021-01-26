import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-reportes',
  templateUrl: './form-reportes.component.html',
  styleUrls: ['./form-reportes.component.scss']
})
export class FormReportesComponent implements OnInit {
  frecuencias:any[] = [
    {value:'manual',viewValue:'Manual'},
    {value:'diaria',viewValue:'Diaria'},
    {value:'semanal',viewValue:'Semanal'},
    {value:'menual',viewValue:'Mensual'},
    {value:'anual',viewValue:'Anual'}
  ]
  reporteForm = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    url: new FormControl('',[Validators.required]),
    hash: new FormControl('',[Validators.required]),
    consulta: new FormControl('',[Validators.required]),
    parametros: new FormControl(''),
    actualizacion: new FormControl('',[Validators.required]),
  })
  titulo:string = 'Nuevo Reporte';
  modo:string = 'crear';

  constructor() { }

  ngOnInit(): void {
  }

  guardarReporte(){
    console.log(this.reporteForm.value);
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'El reporte ha sido guardado correctamente',
      showConfirmButton: true,
      showCloseButton:true
    })
  }

  mostrarError(formControl) {
    if(formControl.hasError('required')) {
      return 'Debes ingresar un valor'
    }
  }

  mapearValores(fila) {
    this.reporteForm.patchValue({
      nombre:fila.nombre,
      url: fila.url,
      consulta: fila.consulta,
      hash:fila.hash,
      actualizacion:fila.actualizacion
    });
    this.reporteForm.get('actualizacion');
    console.log(this.reporteForm.value)
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
