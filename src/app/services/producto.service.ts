import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url = GLOBAL.url;

  constructor(
    private http: HttpClient
  ) { }

  get_productos(filtro): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'productos/' + filtro, {headers});
  }

  get_categorias(): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'categorias', {headers});
  }

  insert_producto(data) {
    const fd = new FormData();

    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('imagen', data.imagen);
    fd.append('precio_compra', data.precio_compra);
    fd.append('precio_venta', data.precio_venta);
    fd.append('stock', data.stock);
    fd.append('idcategoria', data.idcategoria);
    fd.append('puntos', data.puntos);

    return this.http.post(this.url + 'producto/registrar', fd);

  }

  get_producto(id): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'producto/' + id, {headers});
  }

  update_producto(data) {
    const fd = new FormData();

    fd.append('titulo', data.titulo);
    fd.append('descripcion', data.descripcion);
    fd.append('imagen', data.imagen);
    fd.append('precio_compra', data.precio_compra);
    fd.append('precio_venta', data.precio_venta);
    fd.append('idcategoria', data.idcategoria);
    fd.append('puntos', data.puntos);

    return this.http.put(this.url + 'producto/editar/' + data._id + '/' + data.img_name, fd);

  }

  insert_categoria(data): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'categoria/registrar', data, {headers});
  }
  
  delete_producto(id): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + 'producto/' + id, {headers});
  }

  stock_producto(data): Observable<any> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url + 'producto/stock/' + data._id, data, {headers});
  }

}
