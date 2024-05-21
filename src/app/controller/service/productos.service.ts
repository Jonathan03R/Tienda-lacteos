import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BASE_URL } from '../../app.config';
import { Productos } from '../../model/interface/Productos';
import { Observable, delay } from 'rxjs';
import { User } from '../../model/interface/user';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productos: Productos[] = [];

  private http = inject(HttpClient);


  cargarProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${BASE_URL}/products/productosMostrar`);
  }

  getProductos(): Productos[] {
    return this.productos; // Método para obtener los productos almacenados
  }

  actualizarProductos(): void {
    this.cargarProductos().subscribe(
      (data) => {
        this.productos = data.map(producto => ({ ...producto, quantity: 1 }));
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }


}
