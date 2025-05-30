import { IUser } from "../types/IUser";

const URL = "http://localhost:8080/api";

export const getUsers = async (token: string): Promise<IUser[]> => {
    try {
        const response = await fetch(`${URL}/usuarios`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al obtener los usuarios: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id: number, token: string): Promise<boolean> => {
    try {
        const response = await fetch(`${URL}/usuarios/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al eliminar el usuario: ${errorText}`);
        }

        return true;
    } catch (error) {
        throw error;
    }
};
