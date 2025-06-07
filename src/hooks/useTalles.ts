import { useEffect } from "react";
import { useTalleStore } from "../store/talleStore";
import { fetchTalles } from "../services/talleService";


export const useTalles = () => {
    const setTalles = useTalleStore((s) => s.setTalles);

    useEffect(() => {
        fetchTalles().then(setTalles).catch((e) => console.error("error al cargar los talles", e))
    }, [setTalles])
}