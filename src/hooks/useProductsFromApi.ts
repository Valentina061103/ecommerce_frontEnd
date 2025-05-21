import { useEffect } from "react";
import { useCatalogoStore } from "../store/catalogoStore";

export const useProductsFromApi = () => {
  const setProductos = useCatalogoStore((state) => state.setProductos);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/productos");
        const data = await response.json();

        const productosAdaptados = data.map((p: any) => {
          const primerDetalle = p.detalles?.[0]; // Evita error si no hay detalles
          //es necesario porque marca, color, precio estan dentro de este array
        
          return {
            id: p.id,
            nombre: p.nombre,
            marca: primerDetalle?.marca ?? "",
            color: primerDetalle?.color ?? "",
            precio: primerDetalle?.precio?.precioVenta ?? 0,
            categoria: p.categoria ?? "general",
            imagen: primerDetalle?.imagenes?.[0]?.id
              ? `http://localhost:8080/api/imagenes/${primerDetalle.imagenes[0].id}`
              : "", // arma la URL si existe imagen
          };
        });

        setProductos(productosAdaptados);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, [setProductos]);
};
