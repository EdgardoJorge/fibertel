import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/Pedido';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

constructor(private http:HttpClient) {}
  list(id : string): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(
      `${environment.backendBaseUrl}/api/store/pedido/${id}`
    )
  };

}
