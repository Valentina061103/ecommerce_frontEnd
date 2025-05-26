import { useEffect } from "react";
import { useCatalogoStore } from "../store/catalogoStore";

export const useProductsFromApi = () => {
  const setProductos = useCatalogoStore((state) => state.setProductos);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/productos/catalogo");
        const data = await response.json();

        const productosAdaptados = data.map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          marca: p.marca,
          color: p.color,
          precio: p.precio,
          categoria: p.categoria,
          imagen: p.imagenUrl,
        }));

        setProductos(productosAdaptados);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, [setProductos]);
};
