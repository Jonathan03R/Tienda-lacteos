import { Injectable } from '@angular/core';
import { Productos } from '../../../model/interface/Productos';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoServiceService {
  private carrito: Productos[] = [];
  private carritoSubject = new BehaviorSubject<Productos[]>([]);
  constructor() {}

  agregarAlCarrito(producto: Productos) {
    // Verifica si el producto ya está en el carrito
    const existe = this.carrito.some(
      (item) => item.ProductoCodigo === producto.ProductoCodigo
    );
    if (!existe) {
      // Si el producto no está en el carrito, crea un nuevo objeto con cantidad 1
      const nuevoProducto: Productos = { ...producto, quantity: producto.quantity };
      this.carrito.push(nuevoProducto);
      this.carritoSubject.next(this.carrito);
    }
  }

  eliminarDelCarrito(codigoProducto: number) {
    const index = this.carrito.findIndex(
      (item) => item.ProductoCodigo === codigoProducto
    );
    if (index !== -1) {
      this.carrito.splice(index, 1); // Elimina el producto del carrito en la posición 'index'
      this.carritoSubject.next(this.carrito);
    }
  }

  obtenerCarrito() {
    return this.carritoSubject.asObservable();
  }
}
