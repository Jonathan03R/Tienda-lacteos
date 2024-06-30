export interface Productos {
    ProductoCodigo: number;
    ProductoNombre: string;
    ProductoDescripcion: string;
    ProductoPrecio: number;
    ProductoCantidad: number;
    ProductoFoto: string;
    ProductoEstado: string;
    Producto_TipoProductoCodigo: string;
    quantity?: number;
}
export interface tipoproducto{
    TipoProductoNombre: string;
    TipoProductoDescripcion: string;
}
