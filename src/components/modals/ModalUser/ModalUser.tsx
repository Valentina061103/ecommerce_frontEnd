// Ejemplo en un componente
import { useAuthStore } from '../../../store/authStore';

const MiComponente = () => {
    const { user, token, setUser, setToken, logout } = useAuthStore();

    return (
        <div>
        <p>Usuario: {user?.nombre}</p>
        <button onClick={logout}>Cerrar sesión</button>
        </div>
    );
};
