import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url = GLOBAL.url;

  constructor(
    private http: HttpClient
  ) { }

  get_clientes(): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'clientes', {headers});
  }

  insert_cliente(data): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'cliente/registrar', data, {headers});
  }

  get_cliente(id): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'cliente/' + id, {headers});
  }

  update_cliente(data): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url + 'cliente/editar/' + data._id, data, {headers});
  }

  delete_cliente(id): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + 'cliente/eliminar/' + id, {headers});
  }

}
