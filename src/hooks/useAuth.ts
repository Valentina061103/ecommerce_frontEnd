import { login as loginService, register as registerService } from '../services/authService';
import { ILogin, IRegister } from '../types/IAuth';
import { useAuthStore } from '../store/authStore';
import { getUsers } from '../services/userService'; // para obtener info del user

export const useAuth = () => {
    const { setToken, setUser } = useAuthStore();

    const login = async (data: ILogin) => {
        try {
        const { token } = await loginService(data);
        setToken(token);

        // Obtenemos todos los usuarios para buscar el user logueado
        const users = await getUsers(token);
        const userFound = users.find((u) => u.email === data.email);
        if (userFound) setUser(userFound);

        return true;
        } catch (error) {
        console.error("Login error:", error);
        return false;
        }
    };

    const register = async (data: IRegister) => {
        try {
        const { token } = await registerService(data);
        setToken(token);

        // Obtenemos el usuario recién registrado
        const users = await getUsers(token);
        const userFound = users.find((u) => u.email === data.email);
        if (userFound) setUser(userFound);

        return true;
        } catch (error) {
        console.error("Register error:", error);
        return false;
        }
    };

    return { login, register };
};
