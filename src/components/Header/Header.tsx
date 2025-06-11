
import styles from './Header.module.css';
import logoblanco from '../../assets/logo-blanco.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ModalUser } from '../modals/ModalUser/ModalUser';
import { useAuth } from '../../store/authContext';
import { ModalControlsAdmin } from '../modals/ModalControlsAdmin/ModalMenuAdmin';

interface HeaderProps {
    CartClick: () => void;
}

export const Header = ({ CartClick }: HeaderProps) => {
    const navigate = useNavigate();
    const { user } = useAuth(); 
    const [showUserModal, setShowUserModal] = useState(false);
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const adminMenuRef = useRef<HTMLDivElement | null>(null);

    const toHome = () => {
        navigate(`/Home`)
    }

    const goToCatalogoWithGenero = (genero: string) => {
        navigate(`/catalogo?genero=${genero}`);
    };

    const toggleModal = () => {
        setShowUserModal((prev) => !prev);
    };
    const toggleAdminMenu = () => setShowAdminMenu((prev) => !prev);

      // Cierra el modal admin si se hace click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            adminMenuRef.current &&
            !adminMenuRef.current.contains(event.target as Node)
        ) {
            setShowAdminMenu(false);
        }
        };

        if (showAdminMenu) {
        document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAdminMenu]);

    return (
        <div className={styles.conteiner_header}> 
            <div className={styles.content_header}>
                <img src={logoblanco} alt="logo" onClick={toHome} />
                <div className={styles.containerCategories_header}>
                    <p onClick={() => goToCatalogoWithGenero("masculino")}>Hombre</p>
                    <p onClick={() => goToCatalogoWithGenero("femenino")}>Mujer</p>
                    <p onClick={() => goToCatalogoWithGenero("unisex")}>Unisex</p>
                    <p onClick={() => navigate("/catalogo?categoria=accesorios")}>Accesorios</p>
                </div>
                <div className={styles.containerButtons_header}>
                    <span className="material-symbols-outlined" onClick={CartClick}>shopping_cart</span>

                    {user?.rol === 'ADMIN' && (
                        <div style={{ position: 'relative' }} ref={adminMenuRef}>
                        <span
                            className="material-symbols-outlined"
                            onClick={toggleAdminMenu}
                            style={{ cursor: 'pointer' }}
                        >
                            menu
                        </span>
                        {showAdminMenu && (
                            <ModalControlsAdmin onClose={() => setShowAdminMenu(false)} />
                        )}
                        </div>
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