import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableros-page',
  templateUrl: './tableros-page.component.html',
  styleUrls: ['./tableros-page.component.scss']
})
export class TablerosPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('tablero');
  }

}
