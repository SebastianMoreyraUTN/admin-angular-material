import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TemaService } from '../../services/tema.service';

@Component({
  selector: 'app-dual-multiselect',
  templateUrl: './dual-multiselect.component.html',
  styleUrls: ['./dual-multiselect.component.scss'],
})
export class DualMultiselectComponent implements OnInit {
  /*
    La propiedad items define las opciones sobre las que
    va a trabajar este componente. El componente padre que
    utilice multiselect deberá pasarle el conjunto de opciones
    que desee.
  */
  @Input() items: string[] = [];
  @Input() titulo = '';
  seleccionados: string[] = [];
  filtroIzquierda = new FormControl('');
  filtroDerecha = new FormControl('');
  filtradosIzquierda: Observable<string[]>;
  filtradosDerecha: Observable<string[]>;
  constructor(public temaService: TemaService) {}

  ngOnInit(): void {
    this.filtradosIzquierda = this.filtroIzquierda.valueChanges.pipe(
      /*Utilizo startWith para emitir en un principio el valor '' */
      startWith(''),
      /* El map va a aplicar el método filtrar para cada valor emitido*/
      map((valor) => this.filtrar(valor, this.items))
    );

    this.filtradosDerecha = this.filtroDerecha.valueChanges.pipe(
      startWith(''),
      map((valor) => this.filtrar(valor, this.seleccionados))
    );
  }

  filtrar(valor: string, listaItems: string[]): string[] {
    const valorFiltrado = valor.toLowerCase();
    listaItems.sort();
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
    this.actualizarValores();
  }

  quitarItem(item): void {
    this.seleccionados = this.seleccionados.filter((i) => i != item);
    this.items.push(item);
    this.filtroIzquierda.setValue('');
    this.filtroDerecha.setValue('');
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
        this.actualizarValores();
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
        this.actualizarValores();
      })
      .unsubscribe();
    console.log('Items:', this.items);
    console.log('Se quedaron en seleccionados:', this.seleccionados);
  }

  limpiarFiltro(formControl: FormControl): void {
    formControl.setValue('');
  }

  limpiar() {
    this.items.push(...this.seleccionados);
    this.seleccionados = [];
    console.log(this.seleccionados);
    this.actualizarValores();
  }

  mapearValores(items) {
    /* 
      Coloco todos los valores en this.items, luego le asigno a
      seleccionados los valores que se deben mapear . Por último,
      a this.items debemos removerle todos aquellos que estén en this.seleccionados
    */
    this.items.push(...this.seleccionados);
    this.seleccionados = items;
    this.items = this.items.filter((i) => {
      for (let index = 0; index < items.length; index++) {
        if (i === items[index]) {
          return false;
        }
      }
      return true;
    });
    this.actualizarValores();
  }

  actualizarValores() {
    this.filtroIzquierda.updateValueAndValidity();
    this.filtroDerecha.updateValueAndValidity();
  }
}
