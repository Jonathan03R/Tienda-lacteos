import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../../controller/service/pedidos/pedidos.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PedidoRequest } from '../../../../model/interface/pedidos';
import { CarritoServiceService } from '../../../../controller/service/carrito/CarritoService.service';
import { Productos } from '../../../../model/interface/Productos';
import { Router, RouterModule } from '@angular/router';
import { ClienteInfoService } from '../../../../controller/service/pedidos/clienteInfo.service';
import { ClienteInfo } from '../../../../model/interface/cliente-info';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  clienteInfo: ClienteInfo | null = null;

  constructor(
    private pedidosService: PedidosService,
    private carritoService: CarritoServiceService,
    private _routes: Router,
    private clienteInfoService: ClienteInfoService,
    private snackBar: MatSnackBar,
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
          // console.log('Pedido creado:', response);

          pedidoForm.resetForm();

          this.carritoService.vaciarCarrito();
          this.snackBar.open('¡El pedido ha sido registrado exitosamente!', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top'
          });
          // alert('¡El pedido ha sido registrado exitosamente!');
          this._routes.navigate(['/dashboard/envios']);
        },
        (error) => {
          // console.error('Error al crear pedido:', error);
          this.snackBar.open('Error al crear el pedido. Por favor, inténtelo de nuevo.', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'

          });
        }
      );
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos correctamente.', 'Cerrar', {
        duration: 3000,
        // horizontalPosition: 'start,'
        verticalPosition: 'top'
      });
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

  buscarCliente(form: NgForm) {
    const dni = form.value.dni;
    if (!dni) {
      // alert('Por favor, ingrese un DNI.');
      this.snackBar.open('Por favor, ingrese un DNI.', 'Cerrar', {
        duration: 3000,
        // horizontalPosition: 'start,'
        verticalPosition: 'top'
      });
      return;
    }
    
    this.clienteInfoService.buscarClienteInfo({ ClienteDni: dni }).subscribe(
      (response: ClienteInfo) => {
        this.clienteInfo = response;
        form.controls['nombre'].setValue(this.clienteInfo.ClienteNombre);
        form.controls['apellido'].setValue(this.clienteInfo.ClienteApellidos);
        form.controls['direccion'].setValue(this.clienteInfo.ClienteDireccion);
        form.controls['telefono'].setValue(this.clienteInfo.ClienteTelefono);
        form.controls['correo'].setValue(this.clienteInfo.ClienteEmail);
      },
      (error) => {
        // console.error('Error al buscar el cliente:', error);
        this.snackBar.open('DNI no encontrado. Ingrese los datos manualmente.', 'Cerrar', {
          duration: 3000,
          // horizontalPosition: 'start,'
          verticalPosition: 'top'
        });
        // alert('DNI no encontrado. Ingrese los datos manualmente.');
      }
    );
  }
}
