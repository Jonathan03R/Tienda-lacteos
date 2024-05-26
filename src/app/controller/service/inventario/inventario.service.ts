import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Inventario } from '../../../model/interface/inventario';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private inventario: Inventario[] = [];
  private http = inject(HttpClient);


  cargarInventario(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(`${BASE_URL}/company/ObtenerInventario`);
  }

  actualizarInventario(): void {
    this.cargarInventario().subscribe(
      (data) => {
        console.log('datos obtenidos de la bd')
        this.inventario = data;
        console.log(this.inventario) //aqui se llena los datos
      },
      (error) => {
        console.error('Error al cargar inventario:', error);
      }
    );
  }


  obtenerInventario(): Inventario[] {
    console.log(this.inventario) //aqui hay un error , sale vacio :D
    return this.inventario;
  } 

}
