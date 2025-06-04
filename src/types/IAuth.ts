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
    jwt: string;
}
