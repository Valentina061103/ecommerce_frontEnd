import styles from './Catalogo.module.css';
import FiltroSidebarCatalog from '../../components/FiltroSidebarCatalog/FiltroSideBarCatalog';
import CardProductCatalog from '../../components/CardProductCatalog/CardProductCatalog';
import { useCatalogoPublicoStore } from '../../store/catalogoStore';
import { useProductsFromCatalogo } from '../../hooks/useProductsFromCatalogo';

const Catalogo = () => {
  useProductsFromCatalogo();

  const productos = useCatalogoPublicoStore((state) => state.productosFiltrados());

    console.log("Productos en Catalogo.tsx:", productos);

  if (!productos || productos.length === 0) {
    return <div className={styles.CatalogoVacio}>No hay productos disponibles</div>;
  }

  return (
    <div className={styles.CatalogoContainer}>
      <div className={styles.CatalogoTopBar}>
        <h1 className={styles.CatalogoTitle}>Catálogo</h1>
        <div className={styles.SearchContainer}>
            <span className="material-symbols-outlined">
              search
            </span>
            <input type="text" placeholder="Buscar" />
        </div>
      </div>
      <div className={styles.Separator}></div>

    <div className={styles.CatalogoContent}>
            <aside className={styles.CatalogoSideBar}>
              <FiltroSidebarCatalog />
            </aside>
          <section className={styles.CatalogoMain}>
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
                  tipoProducto={producto.tipoProducto}
                />
              ))}
            </div>
          </section>
      </div>
    </div>
  );
};
export default Catalogo;
