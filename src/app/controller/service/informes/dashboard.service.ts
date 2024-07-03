import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  constructor() { }


  obtenerProductosMasVendidos(): Observable<any> {
    return this.http.get(`${BASE_URL}/dashboard/producto-mas-vendido`);
  }

  obtenerGananciasPorMes(): Observable<any> {
    return this.http.get(`${BASE_URL}/dashboard/ganancias-por-mes`);
  }
}
