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

    const handleGoToProfile = () => {
        onClose();
        navigate('/perfil');
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
            <div className={styles.conteinerActions}>
                <p> </p>
                <button className={styles.closeBtn} onClick={onClose}>×</button>
            </div>

        {!token || !user ? (
            <>
            <div className={styles.conteinerAviso}>
                <p className={styles.text}>Aún no has iniciado sesión</p>
            </div>
            <button className={styles.loginBtn} onClick={handleLogin}>Iniciar sesión</button>
            </>
        ) : (
            <>
                <div className={styles.conteinerText}>
                    <div className={styles.conteinerInicial}>
                        <p className={styles.textoinicial}>{user.nombre.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()}</p>
                    </div>
                    <div className={styles.conteinerDescription}>
                        <div className={styles.descriptionText}>
                            <p className={styles.descriptionTextTitle}><strong>{user.nombre}</strong></p>
                            <p>{user.email}</p>
                        </div>
                        <p className={styles.descriptionBoton} onClick={handleGoToProfile}>Mi perfil</p>
                    </div>
                </div>

            <button className={styles.logoutBtn} onClick={handleLogout}>Cerrar sesión</button>
            </>
        )}
        </div>
    );
};