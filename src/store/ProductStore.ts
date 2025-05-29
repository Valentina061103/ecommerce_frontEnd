import { create } from 'zustand';
import { Producto } from "../types/IProduct"


type Store = {
    productos: Producto[];
    filtroCategoria: string[];
    toggleCategoria: (categoria: string) => void;
    productosFiltrados: () => Producto[];
    setProductos: (productos: Producto[]) => void;
};

export const useProductStore = create<Store>((set, get) => ({
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
        return productos.filter((p) => p.categoria?.nombre && filtroCategoria.includes(p.categoria.nombre));
    },
    setProductos: (productos) => set({ productos }),
}));