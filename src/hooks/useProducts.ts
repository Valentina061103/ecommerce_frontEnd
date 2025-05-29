
import { useEffect } from "react";
import { useProductStore } from "../store/ProductStore";

export const useAdminProducts = () => {
    const setProductos = useProductStore((state) => state.setProductos);

    useEffect(() => {
        const fetchProductos = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/productos"); 
            const data = await response.json();

            setProductos(data);
        } catch (error) {
            console.error("Error al obtener productos para el admin:", error);
        }
        };

        fetchProductos();
    }, [setProductos]);
};
