import { useAuth } from '../../../store/authContext';
import { useNavigate } from 'react-router-dom';
import styles from './ModalUser.module.css'; 

interface ModalUserProps {
    onClose: () => void;
}

export const ModalUser = ({ onClose }: ModalUserProps) => {
    const { token, user, logout, loadingUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        onClose();
        navigate('/login');
    };

    const handleLogout = () => {
        logout();
        onClose();
        navigate('/');
    };


    if (loadingUser) {
        return (
            <div className={styles.modal}>
                <p>Cargando usuario...</p>
            </div>
        );
    }

    return (
        <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        {!token || !user ? (
            <>
            <p>Aún no has iniciado sesión.</p>
            <button className={styles.loginBtn} onClick={handleLogin}>Iniciar sesión</button>
            </>
        ) : (
            <>
                <p><strong>Nombre:</strong> {user.nombre}</p>
                <p><strong>Email:</strong> {user.email}</p>

            <button className={styles.logoutBtn} onClick={handleLogout}>Cerrar sesión</button>
            </>
        )}
        </div>
    );
};
