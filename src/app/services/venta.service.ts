import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  public url = GLOBAL.url;


  constructor(
    private http: HttpClient

  ) { }

  get_ventas(): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'ventas', {headers});
  }

  save_data(data): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'venta/registrar', data, {headers});
  }

  data_venta(id): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'venta/datos/' + id, {headers});
  }

}
