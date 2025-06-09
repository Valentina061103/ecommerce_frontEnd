import { useEffect } from "react";
import { fetchProductos } from "../services/productService";
import { useProductosStore } from "../store/ProductStore";

export const useAdminProducts = () => {
    const setProductos = useProductosStore((state) => state.setProductos);

    useEffect(() => {
        const load = async () => {
        try {
            const data = await fetchProductos();
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
        };

        load();
    }, [setProductos]);
};
