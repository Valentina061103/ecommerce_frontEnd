import { useEffect } from "react";
import { usePrecioStore } from "../store/precioStore";
import { fetchPrecios } from "../services/precioService";


export const usePrecios = () => {
    const setPrecios = usePrecioStore((s) => s.setPrecios);

    useEffect(() => {
        fetchPrecios().then(setPrecios).catch((e) => console.error("error al cargar precios", e))
    }, [setPrecios]);
}