import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tablero } from 'src/app/models/tablero.model';

@Injectable({
  providedIn: 'root',
})
export class TablerosService {
  constructor(private http: HttpClient) {}

  getTableros(): Observable<Tablero[]> {
    return this.http.get<Tablero[]>('../../../../assets/data/tableros.json');
  }
}
