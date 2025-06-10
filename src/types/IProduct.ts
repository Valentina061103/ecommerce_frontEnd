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
    //preciosDescuento: any[]; //revisar
}
export type Sexo = "MASCULINO" | "FEMENINO" | "UNISEX";
export type TipoProducto = "ZAPATILLA" | "REMERA" | "BUZO" | "SHORT" | "PANTALON" | "ACCESORIO";

export interface Categoria {
    id: number;
    nombre: string;
}

// export interface Detalle {
//     id: number;
//     estado: boolean;
//     color: string;
//     marca: string;
//     stock: number;
//     precio: Precio;
//     talle: Talle | null;
//     imagenes: Imagen[];
// }

// export interface Producto {
//     id: number;
//     nombre: string;
//     sexo: 'MASCULINO' | 'FEMENINO' | 'UNISEX';
//     tipoProducto: 'ZAPATILLA' | 'REMERA' | 'BUZO' | 'SHORT' | 'PANTALON' | 'ACCESORIO';
//     categoria: Categoria | null;
//     detalles: Detalle[];
// }


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
export interface DetalleRequestDTO {
    precioCompra: number;
    precioVenta: number;
    talle: string;
    stock: number;
    estado: boolean;
    color: string;
    marca: string;
    imagenesUrls: string[];
}

export interface ProductoRequestDTO {
    nombre: string;
    sexo: Sexo;
    tipoProducto: TipoProducto;
    categoriaNombre: string;
    color: string;
    marca: string;
    imagenesUrls: string[];
    detalles: DetalleRequestDTO[];
}

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