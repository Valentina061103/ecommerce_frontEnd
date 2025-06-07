import { Talle } from "../types/IProduct";

export const fetchTalles = async (): Promise<Talle[]> => {
    const res = await fetch("http://localhost:8080/api/talles");
    if (!res.ok) throw new Error("Error al cargar talles");
    return res.json();
};