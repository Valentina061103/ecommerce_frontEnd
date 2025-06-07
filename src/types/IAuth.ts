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
    nombre: string;
    email: string;
    dni: string;
    jwt: string;
}