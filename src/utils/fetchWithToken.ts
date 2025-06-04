export const fetchWithToken = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
};
