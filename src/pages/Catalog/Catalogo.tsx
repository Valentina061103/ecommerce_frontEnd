import styles from './Catalogo.module.css';
import FiltroSidebarCatalog from '../../components/FiltroSidebarCatalog/FiltroSideBarCatalog';
import CardProductCatalog from '../../components/CardProductCatalog/CardProductCatalog';
import { useCatalogoPublicoStore } from '../../store/catalogoStore';
import { useProductsFromCatalogo } from '../../hooks/useProductsFromCatalogo';

const Catalogo = () => {
  useProductsFromCatalogo();

  const productos = useCatalogoPublicoStore((state) => state.productosFiltrados());

  if (!productos || productos.length === 0) {
    return <div className={styles.CatalogoVacio}>No hay productos disponibles</div>;
  }

  return (
    <div className={styles.CatalogoContainer}>
      <aside className={styles.CatlogoSideBar}>
        <FiltroSidebarCatalog />
      </aside>

      <section className={styles.CatalogoMain}>
        <h1 className={styles.CatalogoTitle}>Catálogo</h1>
        <div className={styles.CatalogoGrid}>
          {productos.map((producto) => (
            <CardProductCatalog
              key={producto.id}
              id={producto.id}
              nombre={producto.nombre}
              marca ={producto.marca}
              color={producto.color}
              precio={producto.precio}
              imagen={producto.imagen} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Catalogo;
