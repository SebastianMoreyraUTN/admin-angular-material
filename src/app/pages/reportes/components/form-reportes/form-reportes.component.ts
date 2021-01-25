import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


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
    nombre: new FormControl(''),
    url: new FormControl(''),
    hash: new FormControl(''),
    consulta: new FormControl(''),
    parametros: new FormControl(''),
    actualizacion: new FormControl(''),
  })
  constructor() { }

  ngOnInit(): void {
  }

  guardarReporte(){
    console.log(this.reporteForm.value);
  }

}
