import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

constructor(private http:HttpClient) { }
  list():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(
      `${environment.backendBaseUrl}/api/store/categoria`
    )
  }
  getCategoriaById(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(
      `${environment.backendBaseUrl}/api/store/categoria/${id}` // Asegúrate de usar el id en la URL
    );
  }
}
