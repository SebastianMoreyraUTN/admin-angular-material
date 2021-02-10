import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresentacionesService {
  constructor(private http: HttpClient) {}

  getPresentaciones(): Observable<any[]> {
    return this.http.get<any[]>('../../../../assets/data/presentaciones.json');
  }
}
