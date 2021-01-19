
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getMenuOpts() {
    return this.http.get('../../assets/data/menu.opts.json')
  }
}
