import { useEffect } from "react";
import { useCategoriaStore } from "../store/categoriaStore";
import { fetchCategorias } from "../services/categoriaService";

export const useCategorias = () => {
    const setCategorias = useCategoriaStore((state) => state.setCategorias);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const categorias = await fetchCategorias();
            setCategorias(categorias);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
        };

        fetchData();
    }, [setCategorias]);
};

