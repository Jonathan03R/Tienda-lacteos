import { Injectable } from '@angular/core';
import { Productos } from '../../../model/interface/Productos';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoServiceService {
  private carrito: Productos[] = [];
  private carritoSubject = new BehaviorSubject<Productos[]>(this.obtenerCarritoDesdeLocalStorage());
  constructor() {
    // Inicializar el carrito desde el localStorage al cargar el servicio
    this.carrito = this.obtenerCarritoDesdeLocalStorage();
    this.actualizarCarritoSubject();
  }

  private actualizarCarritoSubject() {
    this.carritoSubject.next(this.carrito);
    this.guardarCarritoEnLocalStorage();
  }

  agregarAlCarrito(producto: Productos) {
    // Verifica si el producto ya está en el carrito
    const existe = this.carrito.some(
      (item) => item.ProductoCodigo === producto.ProductoCodigo
    );
    if (!existe) {
      // Si el producto no está en el carrito, crea un nuevo objeto con cantidad 1
      const nuevoProducto: Productos = { ...producto, quantity: producto.quantity };
      this.carrito.push(nuevoProducto);
      // this.carritoSubject.next(this.carrito);
      this.actualizarCarritoSubject();
    }
  }

  eliminarDelCarrito(codigoProducto: number) {
    const index = this.carrito.findIndex(
      (item) => item.ProductoCodigo === codigoProducto
    );
    if (index !== -1) {
      this.carrito.splice(index, 1); // Elimina el producto del carrito en la posición 'index'
      // this.carritoSubject.next(this.carrito);
      this.actualizarCarritoSubject(); 
    }
  }

  obtenerCarrito() {
    return this.carritoSubject.asObservable();
  }

  obtenerProductosCarrito() {
    return this.carrito; // Devuelve directamente el arreglo de productos del carrito
  }

  vaciarCarrito() {
    this.carrito = [];
    this.actualizarCarritoSubject();
  }

  private guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  private obtenerCarritoDesdeLocalStorage(): Productos[] {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }
}
