const API_URL = 'http://localhost:8080/api/productos';
import {Producto} from "../types/IProduct";


export const fetchProductos = async (): Promise<Producto[]> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al cargar productos");
    return res.json();
  } catch(error) {
    console.error('Error:', error);
    throw error;
  }
};