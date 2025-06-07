import { useEffect } from "react";
import { fetchCategorias } from "../services/categoriaService";
import { useCategoriaStore } from "../store/categoriaStore";

export const useCategorias = () => {
    const setCategorias = useCategoriaStore((s) => s.setCategorias);

    useEffect(() => {
        fetchCategorias().then(setCategorias).catch((e) => console.error("Error cargando categorías:", e));
    }, [setCategorias]);
};
