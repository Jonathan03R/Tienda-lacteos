export interface Cliente {
    ClienteNombre: string;
    ClienteDni: String;
    ClienteApellidos: string;
    ClienteDireccion: string;
    ClienteTelefono: string;
    ClienteEmail: string;
  }
  
  export interface Pedido {
    Pedidototal: number;
  }
  
  export interface DetallePedido {
    DetallePedidoProductoCodigo: number;
    DetallePedidoCantidad: number;
    DetallePedidoSubtotal: number;
  }
  
  export interface Pago {
    PagosFormas_PagoCodigo: number;
    Pagosmonto_pagado: number;
  }
  
  export interface PedidoRequest {
    cliente: Cliente;
    pedido: Pedido;
    detalles: DetallePedido[];
    pago: Pago;
  }