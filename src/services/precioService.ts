import { Precio } from "../types/IProduct";

export const fetchPrecios = async (): Promise<Precio[]> => {
    const res = await fetch("http://localhost:8080/api/precios");
    if (!res.ok) throw new Error("Error al cargar precios");
    return res.json();
};