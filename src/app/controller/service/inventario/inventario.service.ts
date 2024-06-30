import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Categoria, Inventario } from '../../../model/interface/inventario';
import{tipoproducto}from '../../../model/interface/Productos';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private inventario = new BehaviorSubject<Inventario[]>([]);
  private http = inject(HttpClient);

  cargarInventario(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(`${BASE_URL}/company/ObtenerInventario`);
  }

  actualizarInventario(): void {
    this.cargarInventario().subscribe(
      (data) => {
        console.log('datos obtenidos deL INVETARIO')
        this.inventario.next(data);
        // console.log(this.inventario) //aqui se llena los datos
      },
      (error) => {
        console.error('Error al cargar inventario:', error);
      }
    );
  }

  obtenerInventario(): Observable<Inventario[]> {
    return this.inventario.asObservable();
  }

  modificarInventario(formData: FormData): Observable<any> {
    return this.http.put(`${BASE_URL}/company/ActualizarInventario`, formData);
  }

  agregarProducto(producto: FormData): Observable<any> {
    return this.http.post(`${BASE_URL}/products/ingresarProductos`, producto);
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${BASE_URL}/company/ObtenerCategorias`);
  }
  
  agregartipoProducto(categorias: tipoproducto): Observable<any> {
    return this.http.post(`${BASE_URL}/company/agregar-tipo-producto`, categorias);
  }
}