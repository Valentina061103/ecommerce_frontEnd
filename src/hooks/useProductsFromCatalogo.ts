import { useEffect } from "react";
import { useCatalogoPublicoStore } from "../store/catalogoStore";
import { ProductoCatalogo } from '../types/IProduct';

type Filters = {
  tipo?: string;
  categoria?: string;
  genero?: string;
  color?: string;
  precioMin?: string;
  precioMax?: string;
  talles?: string[];
};

// Mapeo de claves de filtros para que coincidan con los parámetros del backend
const filtersToQueryParamMap: Record<keyof Filters, string> = {
  tipo: 'tipoProducto',
  categoria: 'categoria',
  genero: 'sexo',
  color: 'colores',
  precioMin: 'precioMin',
  precioMax: 'precioMax',
  talles: 'talle', 
};

export const useProductsFromCatalogo = (filters: Filters) => {
  const setProductos = useCatalogoPublicoStore((state) => state.setProductos);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const query = new URLSearchParams();

        // Recorremos los filtros y aplicamos el mapeo de claves
        Object.entries(filters).forEach(([key, value]) => {
          // Mapear el nombre de la clave
          const mappedKey = filtersToQueryParamMap[key as keyof Filters];

          if (!mappedKey || value === undefined || value === '') return;

          if (Array.isArray(value)) {
            value.forEach((v) => query.append(mappedKey, v));
          } else {
            query.append(mappedKey, value);
          }
        });

        const hasFilters = Array.from(query.entries()).length > 0;

        const endpoint = hasFilters
          ? `http://localhost:8080/api/productos/filtrar?${query.toString()}`
          : `http://localhost:8080/api/productos/catalogo`;

          console.log(`Llamando a endpoint: ${endpoint}`);


        const response = await fetch(endpoint);
        const data = await response.json();
        console.log("data desde el backend:", data);

        const productosAdaptados: ProductoCatalogo[] = data.map((p: any) => {
          const esCatalogoPlano = p.imagenUrl !== undefined;

          if(esCatalogoPlano) {
            console.log("Producto del /catalogo:", p);
            return{
              id: p.id,
              nombre: p.nombre,
              marca: p.marca,
              color: p.color,
              precio: p.precio,
              categoria: p.categoria ?? '',
              imagen: p.imagenUrl ?? '/assets/placeholder.jpg',
            };
          } else {
            console.log("Producto del /filtrar:", p);
            const detalle = p.detalles?.[0];

            return{
              id: p.id,
              nombre: p.nombre ?? 'Nombre no disponible',
              marca: detalle?.marca ?? 'Marca no disponible',
              color: detalle?.color ?? 'Color no disponible',
              precio: detalle?.precio?.precioVenta ?? 0,
              categoria: p.categoria?.nombre ?? '',
              imagen: p.imagen?.url ?? '/assets/placeholder.jpg',
            };
          }
        });

        console.log("Productos adaptados:", productosAdaptados);
        setProductos(productosAdaptados);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };

    fetchProductos();
  }, [filters, setProductos]);
};

