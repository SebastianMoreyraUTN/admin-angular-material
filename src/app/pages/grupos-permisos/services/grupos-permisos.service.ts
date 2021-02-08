import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from 'src/app/models/grupo.model';
import { Permiso } from 'src/app/models/permiso.model';

@Injectable({
  providedIn: 'root',
})
export class GruposPermisosService {
  constructor(private http: HttpClient) {}

  getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>('../../../../assets/data/grupos.json');
  }

  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>('../../../../assets/data/permisos.json');
  }
}
