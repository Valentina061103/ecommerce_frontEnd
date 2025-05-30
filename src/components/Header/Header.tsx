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
                    <span className="material-symbols-outlined" onClick={toLogin}>person</span>
                    <span className="material-symbols-outlined">menu</span>
                </div>
            </div>
        </div>
    )
}
