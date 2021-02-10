import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VistasService {
  constructor(private http: HttpClient) {}

  getVistas(): Observable<any[]> {
    return this.http.get<any[]>('../../../../assets/data/vistas.json');
  }
}
