import { useState } from 'react';
import styles from './Catalogo.module.css';
import { useEffect } from 'react';

//componentes
import FiltroSidebarCatalog from '../../components/FiltroSidebarCatalog/FiltroSideBarCatalog';
import CardProductCatalog from '../../components/CardProductCatalog/CardProductCatalog';

//store y hooks
import { useCatalogoPublicoStore } from '../../store/catalogoStore';
import { useProductsFromCatalogo } from '../../hooks/useProductsFromCatalogo';

//iconos del boton filtro
import FiltroIcon from '../../assets/FiltroIcon.png';
import filterActiveButton from '../../assets/filterActiveButton.png';

//enums
import {
  ProductType,
  ProductCategory,
  ProductGender,
  ProductColor
} from '../../types/productEnums';
import { useSearchParams } from 'react-router-dom';

type FiltersState = {
  tipo?: string;
  categoria?: string;
  genero?: string;
  color?: string;
  marca?: string;
  precioMin?: string;
  precioMax?: string;
  talles?:string[];
};

const Catalogo = () => {
  const [searchParams] = useSearchParams();

  // Leemos filtros desde los query params de la URL
  const initialFilters: FiltersState = {
    tipo: searchParams.get("tipo") || '',
    categoria: searchParams.get("categoria") || '',
    genero: searchParams.get("genero") || '',
    color: searchParams.get("color") || '',
    marca: searchParams.get("marca") || '',
    precioMin: searchParams.get("precioMin") || '',
    precioMax: searchParams.get("precioMax") || '',
    talles: searchParams.getAll("talles") || [],
  };
  //estado local para los filtros
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  // Sincronizar filtros con los searchParams de la URL si cambian
useEffect(() => {
  setFilters({
    tipo: searchParams.get("tipo") || '',
    categoria: searchParams.get("categoria") || '',
    genero: searchParams.get("genero") || '',
    color: searchParams.get("color") || '',
    marca: searchParams.get("marca") || '',
    precioMin: searchParams.get("precioMin") || '',
    precioMax: searchParams.get("precioMax") || '',
    talles: searchParams.getAll("talles") || [],
  });
}, [searchParams]);

  
  //Hook que llama al backend con los filtros actuales
  useProductsFromCatalogo(filters);

  //productos del store
  const productos = useCatalogoPublicoStore((state) => state.productos);
  
  //estado abrir/cerrar del sidebar
  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const toggleFiltro = () => setFiltroAbierto((prev) => !prev);


  //funcion para actualizar los filtros
  const onFilterChange = (name: string, value: string | string[]) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

    //conversion del filtro al tipo que espera el componente hijo
    const parseFilters = (filters: FiltersState) => {
    return {
      tipo: (filters.tipo?.toUpperCase() as ProductType) || undefined,
      categoria: (filters.categoria?.toUpperCase() as ProductCategory) || undefined,
      genero: (filters.genero?.toUpperCase() as ProductGender) || undefined,
      color: (filters.color?.toUpperCase() as ProductColor) || undefined,
      marca: filters.marca,
      precioMin: filters.precioMin,
      precioMax: filters.precioMax,
      talles: filters.talles ?? [],
    };
  };

  //mensaje si no hay productos
  if (!productos || productos.length === 0) {
    return <div className={styles.CatalogoVacio}>No hay productos disponibles</div>;
  }

  //render princial 
  return (
    <div className={styles.CatalogoContainer}>
      <div className={styles.CatalogoTopBar}>
        <div className={styles.TitleAndButton}>
          <h1 className={styles.CatalogoTitle}>CATALOGO</h1>
          <div className={styles.FiltroToggleButton} onClick={toggleFiltro}>
            <img 
              src={filtroAbierto ? filterActiveButton:FiltroIcon}
              alt="Filtro"
              className={styles.FiltroIcon}
            />
        </div>
      </div>
    </div>

      <div className={styles.Separator}></div>

      <div className={styles.CatalogoContent}>
          <FiltroSidebarCatalog
            isOpen={filtroAbierto}
            filters={parseFilters(filters)}
            onFilterChange={onFilterChange}
        />

        <section className={styles.CatalogoMain}>
          <div className={styles.CatalogoGrid}>
            {productos.map((producto) => (
              <CardProductCatalog
                key={producto.id}
                id={producto.id}
                nombre={producto.nombre}
                marca={producto.marca}
                color={producto.color}
                precio={producto.precio}
                imagen={producto.imagen} 
                tipoProducto={producto.tipoProducto}/>
            ))}
          </div>
        </section>
    </div>
  </div>
  );
};

export default Catalogo;
