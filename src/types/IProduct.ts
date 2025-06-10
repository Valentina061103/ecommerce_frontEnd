export interface Producto {
  id: number;
  nombre: string;
  sexo: 'MASCULINO' | 'FEMENINO' | 'UNISEX';
  tipoProducto: 'ZAPATILLA' | 'REMERA' | 'BUZO' | 'SHORT' | 'PANTALON' | 'ACCESORIO';
  categoria: {
    id: number;
    nombre: string;
  };
  detalles: Detalle[];
}

export interface Detalle {
  id: number;
  estado: boolean;
  color: string;
  marca: string;
  stock: number;
  precio: {
    id: number;
    precioCompra: number;
    precioVenta: number;
  };
  talle: {
    id: number;
    talle: string;
  };
  imagenes: Array<{
    id: number;
    url: string;
  }>;
}

// Producto simplificado para mostrar en catálogo
export interface ProductoCatalogo {
  id: number;
  nombre: string;
  marca: string;
  color: string;
  precio: number;
  categoria: string;
  imagenUrl: string;
}
