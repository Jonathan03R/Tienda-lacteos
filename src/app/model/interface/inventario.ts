export interface Inventario {
  ProductoCodigo: number;
  ProductoNombre: string;
  ProductoDescripcion: string;
  ProductoPrecio: number;
  ProductoCantidad: number;
  ProductoFoto: string;
  Categoria: string; 
  Producto_TipoProductoCodigo: number; 
}

export interface InventoryHistory {
  ProductoCodigo: number;
  ProductoNombre: string;
  CampoModificado: string;
  ValorAnterior: string;
  ValorNuevo: string;
  FechaCambio: string;
  TipoCambio: number;
}

export interface Categoria {
  TipoProductoCodigo: number;
  TipoProductoNombre: string;
}
