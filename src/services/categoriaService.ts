import { Categoria } from "../types/IProduct";

export const fetchCategorias = async (): Promise<Categoria[]> => {
    const res = await fetch("http://localhost:8080/api/categorias");
    if (!res.ok) throw new Error("Error al cargar categorias");
    return res.json();
};