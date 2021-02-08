import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporte } from 'src/app/models/reporte.model';
@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  constructor(private http: HttpClient) {}

  getReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>('../../../../assets/data/reportes.json');
  }
}
