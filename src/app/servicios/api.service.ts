import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlRegiones = 'https://dev.matiivilla.cl/duoc/location/region';
  private urlComunas = 'https://dev.matiivilla.cl/duoc/location/comuna';

  constructor(private http: HttpClient) { }

  obtenerRegiones(): Observable<any> {
    return this.http.get<any>(this.urlRegiones);
  }

  obtenerComunas(regionId: number): Observable<any> {
    return this.http.get<any>(`https://dev.matiivilla.cl/duoc/location/comuna/${regionId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error al obtener comunas:', error);
          throw error; // Re-lanza el error para un manejo posterior
        })
      );
  }
}
