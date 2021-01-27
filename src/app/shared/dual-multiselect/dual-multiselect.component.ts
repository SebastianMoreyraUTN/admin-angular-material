import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dual-multiselect',
  templateUrl: './dual-multiselect.component.html',
  styleUrls: ['./dual-multiselect.component.scss']
})
export class DualMultiselectComponent implements OnInit {

  filtroIzquierda: FormControl = new FormControl();
  items:string[]=["Item1","Item2","Item3","Item4"];
  seleccionados:string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  seleccionarItem(item) {
    this.items = this.items.filter(i => i != item);
    this.seleccionados.push(item);
    console.log(this.seleccionados);
  }

  quitarItem(item) {
    this.seleccionados = this.seleccionados.filter(i => i != item);
    this.items.push(item);
    console.log(this.items);
  }

}
