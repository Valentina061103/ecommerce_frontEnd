// src/hooks/useAdminProducts.ts
import { create } from "zustand";
import { ProductoCatalogo } from "../types/IProduct";

type AdminProductosStore = {
  productos: ProductoCatalogo[];
  loading: boolean;
  error: string | null;
  fetchProductos: (filtros?: Record<string, any>) => Promise<void>;
  toggleActivo: (id: number) => Promise<void>;
};

export const useAdminProductosStore = create<AdminProductosStore>((set) => ({
  productos: [],
  loading: false,
  error: null,

  fetchProductos: async (filtros = {}) => {
    set({ loading: true, error: null });
    try {
      const query = new URLSearchParams();
      if (filtros.categoria) query.append("categoria", filtros.categoria);
      if (filtros.tipoProducto) query.append("tipoProducto", filtros.tipoProducto);

      const res = await fetch(`/api/productos/filtrar?${query.toString()}`);
      if (!res.ok) throw new Error("Error al obtener productos");

      const data = await res.json();
      set({ productos: data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error desconocido", loading: false });
    }
  },

  toggleActivo: async (id: number) => {
    try {
      const res = await fetch(`/api/productos/${id}/activar`, { method: "PUT" });
      if (!res.ok) throw new Error("No se pudo cambiar el estado del producto");

      const updated = await res.json();
      set((state) => ({
        productos: state.productos.map((p) =>
          p.id === id ? { ...p, activo: updated.activo } : p
        ),
      }));
    } catch (error) {
      console.error("Error al cambiar estado activo:", error);
    }
  },
}));
