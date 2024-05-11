import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ProductosService } from '../../../controller/service/productos.service';
import { Productos } from '../../../model/interface/Productos';
import { faCartShopping, faHeart, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

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

  minQuantity: number = 1;
  // maxQuantity: number = 5;
  quantity: number = 1;
  
  a: number = 1;

  productos: Productos[] = [];



  ngOnInit(): void {
    this._productosService.actualizarProductos();
    this.productos = this._productosService.getProductos()
  }



  faCartShopping = faCartShopping;
  faHeart = faHeart;

  increment(producto: Productos) {
    console.log('Incrementando producto:', producto);
    if (producto.quantity! < producto.Productocantidad_disponible) {
      producto.quantity!++;
      this.validateInput(producto);
    }
  }

  decrement(producto: Productos) {
    
    if ( producto.quantity! > this.minQuantity) {
      producto.quantity!--;
      this.validateInput(producto);
    }
  }

  validateInput(producto: Productos) {
    if (producto.quantity! < this.minQuantity) {
      producto.quantity! = this.minQuantity;
    } else if (producto.quantity! > producto.Productocantidad_disponible) {
      producto.quantity! = producto.Productocantidad_disponible;
    }
  }
  
}
