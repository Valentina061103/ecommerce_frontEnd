const API_URL = 'http://localhost:8080/api/productos';
import { Producto, ProductoRequestDTO, DetalleRequestDTO } from "../types/IProduct";

// Obtener todos los productos
export const fetchProductos = async (): Promise<Producto[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
};

// Crear producto
export const crearProducto = async (producto: ProductoRequestDTO, token: string) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

// Activar producto
export const activarProducto = async (id: number, token: string) => {
  const res = await fetch(`${API_URL}/${id}/activar`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al activar producto");
  return res.json();
};

// Agregar detalle
export const agregarDetalle = async (
  productoId: number,
  detalle: DetalleRequestDTO,
  token: string
) => {
  const res = await fetch(`${API_URL}/${productoId}/detalles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(detalle),
  });
  if (!res.ok) throw new Error("Error al agregar detalle");
  return res.json();
};
