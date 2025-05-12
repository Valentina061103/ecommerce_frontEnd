import styles from './FiltroSideBarCatalog.module.css';
import { useCatalogoStore } from '../../store/catalogoStore';

const categorias = ['Calzado', 'Ropa', 'Accesorios'];

const FiltroSidebar = () => {
    const { filtroCategoria, toggleCategoria } = useCatalogoStore();

    return (
        <div className={styles.FiltroSideBar}>
        <h2 className={styles.FiltroTitle}>Categorías</h2>
        {categorias.map((categoria) => (
            <label key={categoria} className={styles.filtroItem}>
            <input
                type="checkbox"
                checked={filtroCategoria.includes(categoria)}
                onChange={() => toggleCategoria(categoria)}
            />
            {categoria}
            </label>
        ))}
        </div>
    );
};

export default FiltroSidebar;
