import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ProductosService } from '../../../controller/service/productos.service';
import { Productos } from '../../../model/interface/Productos';
import { faCartShopping, faHeart, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarritoServiceService } from '../../../controller/service/carrito/CarritoService.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductosComponent implements OnInit{

  public _productosService = inject(ProductosService)
  _carritoService = inject(CarritoServiceService)

  minQuantity: number = 1;
  quantity: number = 1;
  a: number = 1;

  productosFiltrados: Productos[] = []; // Productos filtrados según el término de búsqueda
  filterProperty: string = '';

  productos: Productos[] = [];
  


  ngOnInit(): void {
    this._productosService.actualizarProductos();
    this.productos = this._productosService.getProductos()
    this.productosFiltrados = [...this.productos]; 
  }

  filtrarProductos() {
    this.productosFiltrados = this.productos.filter(producto =>
      producto.ProductoNombre .toLowerCase().includes(this.filterProperty.toLowerCase())
    );
  }


  agregarAlCarrito(producto: Productos) {
    this._carritoService.agregarAlCarrito(producto);
    producto.quantity = 1;
  }



  faCartShopping = faCartShopping;
  faHeart = faHeart;

  increment(producto: Productos) {
    console.log('Incrementando producto:', producto);
    if (producto.quantity! < producto.ProductoCantidad) {
      producto.quantity!++;
      this.validateInput(producto);
    }
  }

  decrement(producto: Productos) {
    
    if ( producto.quantity! > 1) {
      producto.quantity!--;
      this.validateInput(producto);
    }
  }

  validateInput(producto: Productos) {
    if (producto.quantity! < 1) {
      producto.quantity! = 1;
    } else if (producto.quantity! > producto.ProductoCantidad) {
      producto.quantity! = producto.ProductoCantidad;
    }
  }
  
}
