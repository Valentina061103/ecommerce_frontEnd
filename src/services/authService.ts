const API_URL = 'http://localhost:8080/api/auth'; 

export const loginUser = async (credentials: { email: string, password: string }) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) throw new Error('Error al iniciar sesión');
    return res.json(); // Debe devolver: { token, user: { id, email, rol, ... } }
};

export const registerUser = async (data: { email: string, password: string, nombre: string, dni: string }) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Error al registrarse');
    return res.json();
};
