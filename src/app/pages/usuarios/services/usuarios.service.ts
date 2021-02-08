import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('../../../../assets/data/usuarios.json');
  }
}
