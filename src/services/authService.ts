// import { ILogin, IRegister, IToken } from '../types/IAuth';

// const API_URL = 'http://localhost:8080/api/auth';

// export const login = async (data: ILogin): Promise<IToken> => {
//     const response = await fetch(`${API_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//         throw new Error('Login failed');
//     }

//     return await response.json(); // debe devolver { token: string }
// };

// export const register = async (data: IRegister): Promise<IToken> => {
//     const response = await fetch(`${API_URL}/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//         throw new Error('Registro fallido');
//     }

//     return await response.json(); // debe devolver { token: string }
// };

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
