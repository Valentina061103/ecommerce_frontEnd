import styles from './Header.module.css';
import logoblanco from '../../assets/logo-blanco.png';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    CartClick: () => void;
}

export const Header = ({ CartClick }: HeaderProps) => {
    const navigate = useNavigate();

    const toHome = () => {
        navigate(`/Home`)
    }

    const toLogin = () => {
        navigate(`\login`);
    }

    const rol = localStorage.getItem('rol');



    return (
        <div className={styles.conteiner_header}> 
            <div className={styles.content_header}>
                <img src={logoblanco} alt="logo" onClick={toHome} />
                <div className={styles.containerCategories_header}>
                    <p>Nuevo</p>
                    <p>Mujer</p>
                    <p>Hombre</p>
                    <p>Jordan</p>
                    <p>Deporte</p>
                </div>
                <div className={styles.containerButtons_header}>
                    <span className="material-symbols-outlined" onClick={CartClick}>shopping_cart</span>
                    <span className="material-symbols-outlined" onClick={toLogin}>person</span>
                    {rol === 'ROLE_ADMIN' && (
                        <span className="material-symbols-outlined">menu</span>
                    )}
                </div>
            </div>
        </div>
    )
}
