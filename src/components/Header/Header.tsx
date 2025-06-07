import styles from './Header.module.css';
import logoblanco from '../../assets/logo-blanco.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ModalUser } from '../modals/ModalUser/ModalUser';
import { useAuth } from '../../store/authContext';

interface HeaderProps {
    CartClick: () => void;
}

export const Header = ({ CartClick }: HeaderProps) => {
    const navigate = useNavigate();

    const toHome = () => {
        navigate(`/Home`)
    }

    const {user } = useAuth();

    const [showUserModal, setShowUserModal] = useState(false);

    const toggleModal = () => {
        setShowUserModal((prev) => !prev);
    };

    return (
        <div className={styles.conteiner_header}> 
            <div className={styles.content_header}>
                <img src={logoblanco} alt="logo" onClick={toHome} />
                <div className={styles.containerCategories_header}>
                    <p>Hombre</p>
                    <p>Mujer</p>
                    <p>Unisex</p>
                    <p>Accesorios</p>
                </div>
                <div className={styles.containerButtons_header}>
                    <span className="material-symbols-outlined" onClick={CartClick}>shopping_cart</span>
                    {user?.rol === 'ADMIN' && (
                        <span className="material-symbols-outlined">menu</span>
                    )}
                    <span className="material-symbols-outlined" 
                    onClick={toggleModal}>person</span>

                    {showUserModal && (
                            <ModalUser onClose={() => setShowUserModal(false)} />
                    )}
                </div>
            </div>
        </div>
    )
}
