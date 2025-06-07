import { create } from "zustand";
import { Categoria } from "../types/IProduct";

type CategoriaState = {
    categorias: Categoria[];
    setCategorias: (categorias: Categoria[]) => void;
};

export const useCategoriaStore = create<CategoriaState>((set) => ({
    categorias: [],
    setCategorias: (categorias) => set({ categorias }),
}));
