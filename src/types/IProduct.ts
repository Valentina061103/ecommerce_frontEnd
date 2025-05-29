export interface Imagen {
    id: number;
    url: string;
}

export interface Talle {
    id: number;
    talle: string | null;
}

export interface Precio {
    id: number;
    precioCompra: number;
    precioVenta: number;
    preciosDescuento: any[]; //revisar
}

export interface DetalleProducto {
    id: number;
    estado: boolean;
    color: string;
    marca: string;
    stock: number;
    precio: Precio;
    talle: Talle | null;
    imagenes: Imagen[];
}

export interface Categoria {
    id: number;
    nombre: string;
}

export interface Producto {
    id: number;
    nombre: string;
    sexo: string;
    tipoProducto: string;
    categoria: Categoria | null;
    detalles: DetalleProducto[];
}

//agregar tipo de tproducto
export interface ProductoCatalogo{
    id: number;
    nombre: string;
    marca: string;
    color: string;
    precio: number;
    categoria: string;
    imagen: string;
}