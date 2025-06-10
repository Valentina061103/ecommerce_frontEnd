import { Producto } from './IProduct';

export interface CartItem {
  detalleId: number;
  producto: {
    id: number;
    nombre: string;
    tipoProducto: Producto['tipoProducto'];
  };
  detalle: {
    id: number;
    marca: string;
    color: string;
    talle: string;
    precio: number;
    imagenUrl: string;
    stock: number;
  };
  cantidad: number;
}

export interface PaymentRequest {
  
  productos: {
    detalleId: number;
    nombre: string;
    precioVenta: number;
    cantidad: number;
  }[];
}
