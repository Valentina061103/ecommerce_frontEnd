import { create } from 'zustand';
import { ProductoCatalogo } from "../types/IProduct";

type Store = {
  productos: ProductoCatalogo[];
  filtroCategoria: string[];
  toggleCategoria: (categoria: string) => void;
  productosFiltrados: () => ProductoCatalogo[];
  setProductos: (productos: ProductoCatalogo[]) => void;
};

export const useCatalogoPublicoStore = create<Store>((set, get) => ({
  productos: [],
  filtroCategoria: [],
  toggleCategoria: (categoria) => {
    const actual = get().filtroCategoria;
    set({
      filtroCategoria: actual.includes(categoria)
        ? actual.filter((c) => c !== categoria)
        : [...actual, categoria],
    });
  },
  productosFiltrados: () => {
    const { productos, filtroCategoria } = get();
    if (filtroCategoria.length === 0) return productos;
    return productos.filter((p) => filtroCategoria.includes(p.categoria));
  },
  setProductos: (productos) => set({ productos }),
}));
