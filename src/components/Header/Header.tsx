import styles from './Header.module.css';
import logoblanco from '../../assets/logo-blanco.png';

export const Header = () => {
    return (
        <div className={styles.conteiner_header}> 
            <div className={styles.content_header}>
                <img src={logoblanco} alt="logo" />
                <div className={styles.containerCategories_header}>
                    <p>Nuevo</p>
                    <p>Mujer</p>
                    <p>Hombre</p>
                    <p>Jordan</p>
                    <p>Deporte</p>
                </div>
                <div className={styles.containerButtons_header}>
                    <button>filtro</button>
                    <button>
                    <span className="material-symbols-outlined">shopping_cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
