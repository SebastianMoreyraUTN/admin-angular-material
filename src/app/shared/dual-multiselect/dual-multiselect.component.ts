import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dual-multiselect',
  templateUrl: './dual-multiselect.component.html',
  styleUrls: ['./dual-multiselect.component.scss'],
})
export class DualMultiselectComponent implements OnInit {
  @Input() items: string[] = [];
  seleccionados: string[] = [];
  filtroIzquierda = new FormControl('');
  filtroDerecha = new FormControl('');
  filtradosIzquierda: Observable<string[]>;
  filtradosDerecha: Observable<string[]>;
  constructor() {}

  ngOnInit(): void {
    this.filtradosIzquierda = this.filtroIzquierda.valueChanges.pipe(
      startWith(''),
      map((valor) => this.filtrar(valor, this.items))
    );

    this.filtradosDerecha = this.filtroDerecha.valueChanges.pipe(
      startWith(''),
      map((valor) => this.filtrar(valor, this.seleccionados))
    );
  }

  filtrar(valor: string, listaItems: string[]): string[] {
    const valorFiltrado = valor.toLowerCase();
    return listaItems.filter((i) => i.toLowerCase().includes(valorFiltrado));
  }
  /*
    Elimina el item seleccionado de la lista de la izquierda y lo agrega a 
    la lista de la derecha. En caso de que el item seleccionado fue visualizado
    mediante un filtro, también lo elimina de la lista de items filtrados.
    */
  seleccionarItem(item) {
    this.items = this.items.filter((i) => i != item);
    this.seleccionados.push(item);
    this.filtroIzquierda.updateValueAndValidity();
    this.filtroDerecha.updateValueAndValidity();
  }

  quitarItem(item): void {
    this.seleccionados = this.seleccionados.filter((i) => i != item);
    this.items.push(item);
    this.filtroIzquierda.updateValueAndValidity();
    this.filtroDerecha.updateValueAndValidity();
  }

  seleccionarTodos() {
    this.filtradosIzquierda
      .subscribe((res: string[]) => {
        /*
          Cuando me suscribo la respuesta es la lista de items entera, 
          esto se debe a que al hacer click en "Seleccionar Todos" el evento
          valueChanges no se dispara, por lo tanto no se aplica ningún filtro
          por más que se haya aplicado anteriormente. Por lo tanto debemos 
          forzar la aplicación del filtro. Esa es la razón por la cual a "res"
          le asignamos el retorno de "this.filtrar".
          */
        res = this.filtrar(this.filtroIzquierda.value, this.items);
        this.seleccionados.push(...res);
        this.items = this.items.filter((item) => {
          for (let index = 0; index < res.length; index++) {
            if (item === res[index]) {
              return false;
            }
          }
          return true;
        });
        this.filtroIzquierda.updateValueAndValidity();
        this.filtroDerecha.updateValueAndValidity();
      })
      .unsubscribe();
    console.log('Seleccionados:', this.seleccionados);
    console.log('Se quedaron en items:', this.items);
  }

  quitarTodos() {
    this.filtradosDerecha
      .subscribe((res: string[]) => {
        res = this.filtrar(this.filtroDerecha.value, this.seleccionados);
        this.items.push(...res);
        this.seleccionados = this.seleccionados.filter((item) => {
          for (let index = 0; index < res.length; index++) {
            if (item === res[index]) {
              return false;
            }
          }
          return true;
        });
        this.filtroIzquierda.updateValueAndValidity();
        this.filtroDerecha.updateValueAndValidity();
      })
      .unsubscribe();
    console.log('Items:', this.items);
    console.log('Se quedaron en seleccionados:', this.seleccionados);
  }

  limpiarFiltro(formControl: FormControl): void {
    formControl.setValue('');
  }

  mapearValores(items) {
    this.seleccionados = items;
    this.items = this.items.filter((i) => {
      for (let index = 0; index < items.length; index++) {
        if (i === items[index]) {
          return false;
        }
      }
      return true;
    });
    this.filtroIzquierda.updateValueAndValidity();
    this.filtroDerecha.updateValueAndValidity();
  }
}
