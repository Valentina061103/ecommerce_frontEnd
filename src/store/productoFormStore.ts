import { create } from "zustand";
import { ProductoRequestDTO } from "../types/IProduct";

type ProductoFormState = {
    producto: ProductoRequestDTO | null;
    setProducto: (producto: ProductoRequestDTO) => void;
    resetProducto: () => void;
};

export const useProductoFormStore = create<ProductoFormState>((set) => ({
    producto: null,
    setProducto: (producto) => set({ producto }),
    resetProducto: () => set({ producto: null }),
}));
