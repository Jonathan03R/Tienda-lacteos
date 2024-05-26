import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductosService } from './controller/service/productos.service';
import { InventarioService } from './controller/service/inventario/inventario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  _productosService = inject(ProductosService)
  _inventario = inject (InventarioService)

  ngOnInit(): void {
    this._productosService.actualizarProductos();
    this._inventario.actualizarInventario();
  }

}
