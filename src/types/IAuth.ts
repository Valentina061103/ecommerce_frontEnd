export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    nombre: string;
    email: string;
    password: string;
    dni: string;
}

export interface AuthResponse {
    id: number;
    nombre: string;
    email: string;
    dni: string;
    rol: string;
    jwt: string;
}