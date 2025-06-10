export enum ProductType {
    ZAPATILLAS = "ZAPATILLA",
    REMERAS = "REMERA",
    BUZO = "BUZO",
    SHORTS = "SHORTS",
    PANTALON = "PANTALÓN",
    ACCESORIOS = "ACCESORIOS",
}

export enum ProductCategory {
    RUNNING = "RUNNING",
    JORDAN = "JORDAN",
    MODA = "MODA",
    FUTBOL = "FUTBOL",
    BASQUET = "BASQUET",
}

export enum ProductGender {
    HOMBRE = "MASCULINO",
    MUJER = "FEMENINO",
    UNISEX = "UNISEX",
}

export enum ProductColor {
    NEGRO = "NEGRO",
    BLANCO = "BLANCO",
    GRIS = "GRIS",
    VERDE = "VERDE",
    ROJO = "ROJO",
    AZUL = "AZUL",
    AMARILLO = "AMARILLO",
    ROSA = "ROSA",
    VIOLETA = "VIOLETA",
    MULTICOLOR = "MULTICOLOR",
}

export enum ProductEstado {
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO",
}

export type ProductSize =
    | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL"
    | "35" | "36" | "37" | "38" | "39" | "40"
    | "41" | "42" | "43" | "44" | "45";

export type StockPorTalle = {
    talle: ProductSize;
    cantidad: number;
};

export const ProductSizeValues: ProductSize[] = [
    "XS", "S", "M", "L", "XL", "XXL", "XXXL",
    "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45"
];

