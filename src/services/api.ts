


const API_BASE_URL = 'http://localhost:8080/api'; // La base para todos tus endpoints REST

interface RequestOptions extends RequestInit {
    token?: string; // Permitir pasar un token explícitamente, aunque el interceptor lo agregaría
}

export const callApi = async <T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> => {
   const defaultHeaders: { [key: string]: string } = { // <-- Esta línea
    'Content-Type': 'application/json',
};
    // Añadir el token de autenticación si está disponible
    const token = options.token || localStorage.getItem("token");
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers, // Permitir que las opciones de la llamada sobrescriban los headers por defecto
        },
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!res.ok) {
        let errorData: any;
        try {
            // Intentar parsear el error como JSON, si es posible
            errorData = await res.json();
        } catch (e) {
            // Si no es JSON, tomar el texto
            errorData = await res.text();
        }

        // Crear un error más informativo
        const errorMessage = errorData.message || errorData || `Error ${res.status}: ${res.statusText}`;
        const customError = new Error(errorMessage) as any;
        customError.status = res.status;
        customError.data = errorData; // Adjuntar los datos de error si existen
        throw customError;
    }

    // Si la respuesta es 204 No Content, no intentes parsear JSON
    if (res.status === 204) {
        return null as T; // Devuelve null si no hay contenido
    }

    return res.json();
};

// Puedes exportar métodos HTTP específicos para mayor comodidad
export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) => callApi<T>(endpoint, { method: 'GET', ...options }),
    post: <T>(endpoint: string, data: any, options?: RequestOptions) => callApi<T>(endpoint, { method: 'POST', body: JSON.stringify(data), ...options }),
    put: <T>(endpoint: string, data: any, options?: RequestOptions) => callApi<T>(endpoint, { method: 'PUT', body: JSON.stringify(data), ...options }),
    delete: <T>(endpoint: string, options?: RequestOptions) => callApi<T>(endpoint, { method: 'DELETE', ...options }),
};