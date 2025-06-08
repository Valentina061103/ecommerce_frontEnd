import { LoginRequest, RegisterRequest, AuthResponse } from '../types/IAuth';

const BASE_URL = 'http://localhost:8080/api/auth';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }

    return res.json();
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }

    return res.json();
};

//guardar los datos del usuario para usarlos en modaluser
export const getUserFromToken = async (): Promise<AuthResponse | null> => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await fetch("http://localhost:8080/api/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Token inválido");

    return await res.json();
};
