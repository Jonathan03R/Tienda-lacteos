export interface Inventario {
  ProductoCodigo: number;
  ProductoNombre: string;
  ProductoDescripcion: string;
  ProductoPrecio: number;
  ProductoCantidad: number;
  ProductoFoto: string;
  Categoria: string; // Este es el campo AS Categoria en la consulta SQL
  Producto_TipoProductoCodigo: number; // Añadir este campo
}

export interface InventoryHistory {
  ProductoCodigo: number;
  ProductoNombre: string;
  FechaCambio: string;
  TipoCambio: number;
}

export interface Categoria {
  TipoProductoCodigo: number;
  TipoProductoNombre: string;
}
