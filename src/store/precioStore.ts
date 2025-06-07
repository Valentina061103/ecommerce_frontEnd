import { create } from "zustand";
import { Precio } from "../types/IProduct";

type PrecioState = {
    precios: Precio[];
    setPrecios: (precios: Precio[]) => void;
};

export const usePrecioStore = create<PrecioState>((set) => ({
    precios: [],
    setPrecios: (precios) => set({ precios }),
}));
