import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

constructor(private http:HttpClient) { }
  list():Observable<Marca[]>{
    return this.http.get<Marca[]>(
      `${environment.backendBaseUrl}/api/store/marca`
    )
  }
  getMarcaById(id: string): Observable<Marca> {
    return this.http.get<Marca>(
      `${environment.backendBaseUrl}/api/store/marca/${id}` // Asegúrate de usar el id en la URL
    );
  }  
}
