import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { InventoryHistory } from '../../../model/interface/inventario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HistorialinventarioService {

  private historial: InventoryHistory[] = [];
  private http = inject(HttpClient);

  cargarHistorial(): Observable<InventoryHistory[]> {
    return this.http.get<InventoryHistory[]>(`${BASE_URL}/historial/historialProductos`);
  }

  getHistorial(): InventoryHistory[] {
    return this.historial; 
  }

  actualizarHistorial(): void {
    this.cargarHistorial().subscribe(
      (data) => {
        this.historial = data;
        // console.log(this.historial)
      },
      (error) => {
        console.error('Error al cargar historial de inventario:', error);
      }
    );
  }

}
