import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor( private http: HttpClient) { }

  list(): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${environment.backendBaseUrl}/api/store/producto`);
  }
  search(query: string): Observable<any> {
    return this.http.get(`${environment.backendBaseUrl}/api/store/producto/Buscar?Nombre=${query}`);
  }
  getProductoById(id: string): Observable<Producto> {
    return this.http.get<Producto>(
      `${environment.backendBaseUrl}/api/store/producto/${id}` // Asegúrate de usar el id en la URL
    );
  }  
}
