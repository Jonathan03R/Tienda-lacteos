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

  product$ = this._productosService.getUser();

  minQuantity: number = 1;
  maxQuantity: number = 5;
  quantity: number = 1;
  a: number = 1;

  productos: any[] = [];



  ngOnInit(): void {
    this.cargarProductos()
  }
  cargarProductos() {
    this._productosService.getProducts().subscribe(
      (data) => {
        this.productos = [...data]; // Hacer una copia de los datos antes de asignarlos
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }
  

  faCartShopping = faCartShopping;
  faHeart = faHeart;

  increment() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
      this.validateInput();
    }
  }

  decrement() {
    if (this.quantity > this.minQuantity) {
      this.quantity--;
      this.validateInput();
    }
  }

  validateInput() {
    if (this.quantity < this.minQuantity) {
      this.quantity = this.minQuantity;
    } else if (this.quantity > this.maxQuantity) {
      this.quantity = this.maxQuantity;
    }
  }
  
}
