import { useState } from "react";
import { ProductoRequestDTO, DetalleRequestDTO } from "../types/IProduct";
import { crearProducto, agregarDetalle, activarProducto } from "../services/productService";

export const useProductoForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const crear = async (producto: ProductoRequestDTO, token: string) => {
        try {
        setLoading(true);
        return await crearProducto(producto, token);
        } catch (err) {
        setError("Error al crear producto");
        throw err;
        } finally {
        setLoading(false);
        }
    };

    const agregar = async (id: number, detalle: DetalleRequestDTO, token: string) => {
        try {
        setLoading(true);
        return await agregarDetalle(id, detalle, token);
        } catch (err) {
        setError("Error al agregar detalle");
        throw err;
        } finally {
        setLoading(false);
        }
    };

    const activar = async (id: number, token: string) => {
        try {
        setLoading(true);
        return await activarProducto(id, token);
        } catch (err) {
        setError("Error al activar producto");
        throw err;
        } finally {
        setLoading(false);
        }
    };

    return { crear, agregar, activar, loading, error };
};
