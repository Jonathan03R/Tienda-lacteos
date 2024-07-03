import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  constructor() { }
  private http = inject(HttpClient);

  obtenerProductosConBajoStock(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/informes/productos-bajo-stock`);
  }

  obtenerVentasPorCliente(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/informes/ventas-por-cliente`);
  }

  obtenerVentasPorMes(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/informes/ventas-por-mes`);
  }
  

}
