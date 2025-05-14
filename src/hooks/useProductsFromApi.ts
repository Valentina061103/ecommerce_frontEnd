import { useEffect } from "react";
import { useCatalogoStore } from "../store/catalogoStore";

export const useProductsFromApi = () => {
  const setProductos = useCatalogoStore((state) => state.setProductos);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();

        // Map para adaptar la estructura de los productos
        const productosAdaptados = data.map((p: any) => ({
          id: p.id,
          nombre: p.name,
          descripcion: p.description,
          precio: p.price,
          categoria: "general",
          imagen: p.imageUrl,
        }));

        setProductos(productosAdaptados);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, [setProductos]);
};
