

export interface ClienteInfo {
    ClienteDni: string;
    ClienteNombre: string;
    ClienteApellidos: string;
    ClienteDireccion: string;
    ClienteTelefono: string;
    ClienteEmail: string;
    Pedidos: Pedido[];
  }
  
  export interface Pedido {
    PedidoCodigo: number;
    Pedidofecha: string;
    Pedidototal: number;
    PedidoEstado: string;
    Detalles: DetallePedido[];
  }
  
  export interface DetallePedido {
    DetallePedidoCodigo: number;
    DetallePedidoCantidad: number;
    DetallePedidoSubtotal: number;
    ProductoNombre: string;
    ProductoDescripcion: string;
    ProductoPrecio: number;
  }
  