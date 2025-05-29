import { useEffect } from "react";
import { useCatalogoPublicoStore } from "../store/catalogoStore";
import { ProductoCatalogo } from '../types/IProduct';

export const useProductsFromCatalogo = () => {
  const setProductos = useCatalogoPublicoStore((state) => state.setProductos);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/productos/catalogo");
        const data = await response.json();

        const productosAdaptados: ProductoCatalogo[] = data.map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          marca: p.marca ,
          color: p.color,
          precio: p.precio,
          categoria: p.categoria,
          imagen: p.imagenUrl,
        }));

        setProductos(productosAdaptados);
      } catch (error) {
        console.error("Error al obtener productos del catálogo:", error);
      }
    };

    fetchProductos();
  }, [setProductos]);
};
