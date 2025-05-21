import { create } from 'zustand';

type Producto = {
  id: number;
  nombre: string;
  marca: string;
  color: string;
  precio: number;
  categoria: string;
  imagen: string;
};


type Store = {
  productos: Producto[];
  filtroCategoria: string[];
  toggleCategoria: (categoria: string) => void;
  productosFiltrados: () => Producto[];
  setProductos: (productos: Producto[]) => void;
};

export const useCatalogoStore = create<Store>((set, get) => ({
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
