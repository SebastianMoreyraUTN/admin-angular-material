import { Component } from '@angular/core';
import { TemaService } from './services/tema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private temaService: TemaService) {}

  ngOnInit() {
    this.temaService.load();
  }
}
