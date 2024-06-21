import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../../controller/service/pedidos/pedidos.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PedidoRequest } from '../../../../model/interface/pedidos';
import { CarritoServiceService } from '../../../../controller/service/carrito/CarritoService.service';
import { Productos } from '../../../../model/interface/Productos';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PedidoComponent implements OnInit {
  productosCarrito: Productos[] = [];

  constructor(
    private pedidosService: PedidosService,
    private carritoService: CarritoServiceService,
    private _routes: Router
  ) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe((carrito) => {
      this.productosCarrito = carrito;
    });
  }

  registrarPedido(pedidoForm: NgForm) {
    if (pedidoForm.valid) {
      const formValues = pedidoForm.value;

      // Obtener los productos del carrito desde el servicio
      const productosCarrito = this.carritoService.obtenerProductosCarrito();

      // Calcular el total del pedido y detalles del pedido
      const totalPedido = this.calcularTotalPedido(productosCarrito);
      const detallesPedido = this.generarDetallesPedido(productosCarrito);

      const pedidoRequest: PedidoRequest = {
        cliente: {
          ClienteNombre: formValues.nombre,
          ClienteDni: formValues.dni,
          ClienteApellidos: formValues.apellido,
          ClienteDireccion: formValues.direccion,
          ClienteTelefono: formValues.telefono,
          ClienteEmail: formValues.correo,
        },
        pedido: {
          Pedidototal: totalPedido,
        },
        detalles: detallesPedido,
        pago: {
          PagosFormas_PagoCodigo: parseInt(formValues.metodoPago, 10),
          Pagosmonto_pagado: totalPedido, // Calcular el monto pagado basado en el total del pedido
        },
      };

      this.pedidosService.crearPedido(pedidoRequest).subscribe(
        (response) => {
          console.log('Pedido creado:', response);

          pedidoForm.resetForm();

          this.carritoService.vaciarCarrito();

          alert('¡El pedido ha sido registrado exitosamente!');
          this._routes.navigate(['/dashboard/envios']);
        },
        (error) => {
          console.error('Error al crear pedido:', error);

          alert('Error al crear el pedido. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos requeridos correctamente.');
    }
  }

  calcularTotal(): string {
    let total = 0;
    for (const producto of this.productosCarrito) {
      total += producto.ProductoPrecio * producto.quantity!;
    }
    return total.toFixed(2);
  }

  // Método para calcular el total del pedido basado en los productos del carrito
  calcularTotalPedido(productosCarrito: Productos[]): number {
    let total = 0;
    for (const producto of productosCarrito) {
      if (producto.quantity) {
        total += producto.ProductoPrecio * producto.quantity;
      }
    }
    return total;
  }

  // Método para generar los detalles del pedido basados en los productos del carrito
  generarDetallesPedido(productosCarrito: Productos[]) {
    return productosCarrito.map((producto) => ({
      DetallePedidoProductoCodigo: producto.ProductoCodigo,
      DetallePedidoCantidad: producto.quantity!,
      DetallePedidoSubtotal: producto.ProductoPrecio * producto.quantity!,
    }));
  }
}
