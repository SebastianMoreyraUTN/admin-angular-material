import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dual-multiselect',
  templateUrl: './dual-multiselect.component.html',
  styleUrls: ['./dual-multiselect.component.scss'],
})
export class DualMultiselectComponent implements OnInit {
  items: string[] = [
    'Comercial',
    'Desarrollo',
    'Soporte',
    'Operaciones',
    'RRHH',
    'Riesgo',
  ];
  seleccionados: string[] = [];
  filtradosIzquierda: string[] = [];
  mostrarFiltradosIzquierda: boolean = false;

  filtradosDerecha: string[] = [];
  mostrarFiltradosDerecha: boolean = false;
  filtroIzquierda: string;
  constructor() {}

  ngOnInit(): void {}

  seleccionarItem(item) {
    this.items = this.items.filter((i) => i != item);
    this.seleccionados.push(item);
    if (this.filtradosIzquierda.length > 0) {
      this.filtradosIzquierda = this.filtradosIzquierda.filter(
        (i) => i != item
      );
    }
    console.log(this.seleccionados);
  }

  quitarItem(item): void {
    this.seleccionados = this.seleccionados.filter((i) => i != item);
    this.items.push(item);
    if (this.filtradosDerecha.length > 0) {
      this.filtradosDerecha = this.filtradosDerecha.filter((i) => i != item);
    }
    console.log(this.items);
  }

  aplicarFiltroIzquierda(valor): void {
    this.filtradosIzquierda = [];
    if (valor != '') {
      this.mostrarFiltradosIzquierda = true;
      let valorMinuscula = valor.toLowerCase();
      this.filtradosIzquierda = this.items.filter((item) =>
        item.toLowerCase().includes(valorMinuscula)
      );
      console.log(this.filtradosIzquierda);
    } else {
      this.mostrarFiltradosIzquierda = false;
    }
  }

  aplicarFiltroDerecha(valor) {
    this.filtradosDerecha = [];
    if (valor != '') {
      this.mostrarFiltradosDerecha = true;
      let valorMinuscula = valor.toLowerCase();
      this.filtradosDerecha = this.seleccionados.filter((item) =>
        item.toLowerCase().includes(valorMinuscula)
      );
      console.log(this.filtradosDerecha);
    } else {
      this.mostrarFiltradosDerecha = false;
    }
  }

  seleccionarTodos() {
    this.seleccionados.push(...this.items);
    this.items = [];
    this.filtradosIzquierda = [];
  }

  quitarTodos() {
    this.items.push(...this.seleccionados);
    this.seleccionados = [];
    this.filtradosDerecha = [];
  }

  limpiarFiltro(inputIzquierda?, inputDerecha?): void {
    if (inputDerecha) {
      inputDerecha.value = '';
      this.aplicarFiltroDerecha(inputDerecha.value);
      return;
    }
    inputIzquierda.value = '';
    this.aplicarFiltroIzquierda(inputIzquierda.value);
  }
}
