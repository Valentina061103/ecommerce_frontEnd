import { create } from 'zustand';
import { ProductoCatalogo } from "../types/IProduct";

// Definición del tipo de estado y acciones del store
type Store = {
  productos: ProductoCatalogo[];
  setProductos: (productos: ProductoCatalogo[]) => void;
};


// Creación del store usando zustand
export const useCatalogoPublicoStore = create<Store>((set) => ({
  productos: [],
  setProductos: (productos) => set({ productos }),
}));
