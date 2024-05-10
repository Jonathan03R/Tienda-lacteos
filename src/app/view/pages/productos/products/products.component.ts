import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ProductosService } from '../../../../controller/service/productos.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Productos } from '../../../../model/interface/Productos';
import { faCartShopping, faHeart, } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent { 

  @Input({ required: true }) product?: Productos;


  private _productosService = inject(ProductosService)

  minQuantity: number = 1;
  maxQuantity: number = 5;
  quantity: number = 1;
  a: number = 1;

  productos: any[] = [];

  

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
