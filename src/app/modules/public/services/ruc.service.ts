import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RucService {
  private apiUrl = 'https://dniruc.apisperu.com/api/v1/ruc';
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImkyMzExNjc5QGNvbnRpbmVudGFsLmVkdS5wZSJ9.0pG3lIRjleM4daudHNkYLsjAsU7NLcRHkZfj66WYxbQ';

  constructor(private http: HttpClient) {}

  getRucData(ruc: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${this.apiUrl}/${ruc}`, { headers });
  }
}
