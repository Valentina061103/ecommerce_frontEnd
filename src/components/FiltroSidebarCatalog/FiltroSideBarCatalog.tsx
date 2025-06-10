import React, { useEffect, useState } from 'react';
import styles from './FiltroSideBarCatalog.module.css';
import { ProductSizeValues } from '../../types/productEnums';
import {
    ProductType,
    ProductCategory,
    ProductGender,
    ProductColor,
} from '../../types/productEnums';


//props del componente, filtros y callbacks para cambio
type Props = {
    isOpen: boolean; //estado del sidebar
    filters: { //estado de los filtros
    tipo?: ProductType;
    categoria?: ProductCategory;
    genero?: ProductGender;
    color?: ProductColor;
    precioMin?: string;
    precioMax?: string;
    talles?:string[];
    };
    onFilterChange: (name: string, value: string | string[]) => void; //actualiza los filtros
};


//mapeo de colores a su codigo css 
const colorMap: Record<ProductColor, string> = {
    [ProductColor.NEGRO]: '#000000',
    [ProductColor.BLANCO]: '#FFFFFF',
    [ProductColor.GRIS]: '#808080',
    [ProductColor.VERDE]: '#008000',
    [ProductColor.ROJO]: '#FF0000',
    [ProductColor.AZUL]: '#0000FF',
    [ProductColor.AMARILLO]: '#FFFF00',
    [ProductColor.ROSA]: '#FFC0CB',
    [ProductColor.VIOLETA]: '#800080',
    [ProductColor.MULTICOLOR]: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)',
};


const FiltroSideBar: React.FC<Props> = ({ 
    isOpen, 
    filters,
    onFilterChange,
}) => {

    // Estados locales para inputs de precio, para manejar la edición sin afectar filtros externos inmediatamente
    const [localPrecioMin, setLocalPrecioMin] = useState(filters.precioMin || '');
    const [localPrecioMax, setLocalPrecioMax] = useState(filters.precioMax || '');

  // Sincronizar el estado local si cambian los filtros desde afuera (cuando se resetee por ejemplo)
    useEffect(() => {
        setLocalPrecioMin(filters.precioMin || '');
    }, [filters.precioMin]);

    useEffect(() => {
        setLocalPrecioMax(filters.precioMax || '');
    }, [filters.precioMax]);

    // Función para manejar el Enter y enviar el filtro al padre del input
    const handlePrecioKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        name: 'precioMin' | 'precioMax',
    ) => {
        if (e.key === 'Enter') {
        //obtener el valor local actual
        const value = name === 'precioMin' ? localPrecioMin : localPrecioMax;

        // Validar que sea número positivo o vacío (podés ajustar según necesidad)
        if (value === '' || (/^\d+$/.test(value) && Number(value) >= 0)) {
            onFilterChange(name, value);
        } 
    }
};
     // Estado local para controlar la visibilidad del sidebar (para animaciones y clases CSS)
    const [visible, setVisible] = useState(isOpen);

    // Mostrar el sidebar cuando isOpen se vuelve true
    useEffect(() => {
        if (isOpen) setVisible(true);
    }, [isOpen]);

    // Al terminar la animación (transición CSS), ocultar sidebar
    const handleTransitionEnd = () => {
    if (!isOpen) {
        setVisible(false); // ocultar visibilidad (para clase .hidden)
    }
};

    //funcion generica para el checkbox lists
const renderCheckboxList = (
    label: string,
    key: 'tipo' | 'categoria' | 'genero',
    options: string[],
) => {
    return (
        <div className={styles.filtroGrupo} key={key}>
            <label>{label}</label>
            <div className={styles.subSeparator} />
            <div className={styles.checkboxList}>
                {options.map((option) => {
                const isChecked = filters[key] === option;
                return (
                    <div
                        key={option}
                        className={`${styles.checkboxItem} ${isChecked ? styles.checked : ''}`}
                        onClick={() =>
                            onFilterChange(key, isChecked ? '' : option)
                    }
                    role="checkbox"
                    aria-checked={isChecked}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onFilterChange(key, isChecked ? '' : option);
                    }
                }}
            >
                <div className={styles.checkbox}>
                    {isChecked ? '✓' : ''}
                </div>
                {option}
            </div>
            );
        })}
    </div>
</div>
);
};
    //renderiza el filtro de talles como checkbox multiple
    const renderTallesFilter = () => {
        const selectedTalles = filters.talles || [];

        return (
        <div className={styles.filtroGrupo}>
            <label>Talles</label>
            <div className={styles.subSeparator} />
            <div className={styles.talleList}>
                {ProductSizeValues.map((talle) => {
                const isChecked = selectedTalles.includes(talle);
                return (
                <div
                key={talle}
                className={`${styles.talleItem} ${isChecked ? styles.checked : ''}`}
                onClick={() => {
                    //alterna seleccion de talle
                    const nuevosTalles = isChecked 
                    ? selectedTalles.filter((t)=> t !== talle)
                    : [...selectedTalles,talle];

                onFilterChange('talles', nuevosTalles);
            }}
            role="checkbox"
            aria-checked={isChecked}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const nuevosTalles = isChecked
                        ? selectedTalles.filter((t) => t !== talle)
                        : [...selectedTalles,talle];
                onFilterChange('talles', nuevosTalles);
                }
            }}
        >
            {talle}
        </div>
        );
    })}
</div>
</div>
);
};


    return(
    <div className={`${styles.sidebarWrapper} ${!isOpen ? styles.closed : ''}`}>
        <aside
            className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${
            !visible ? styles.hidden : ''}`}
            onTransitionEnd={(e) => {
                if (e.propertyName === 'transform') {
                    handleTransitionEnd();
                }
            }}
        >
            <div className={styles.header}>
                <h3>Filtrar por</h3>
            </div>

            {/* Renderizado de checkbox lists para filtros básicos */}
            {renderCheckboxList('Tipo', 'tipo', Object.values(ProductType))}
            {renderCheckboxList('Categoría', 'categoria', Object.values(ProductCategory))}
            {renderCheckboxList('Género', 'genero', Object.values(ProductGender))}

            {/* Filtro de colores con círculos clickeables */}
            <div className={styles.filtroGrupo}>
                <label>Color</label>
                <div className={styles.subSeparator} />
                <div className={styles.colorGrid}>
                    {Object.values(ProductColor).map((colorKey) => (
                        <div
                            key={colorKey}
                            className={`${styles.colorCircle} ${
                                filters.color === colorKey ? styles.selected : ''
                    }`}
                    style={{ background: colorMap[colorKey] }}
                    onClick={() =>
                        onFilterChange('color', filters.color === colorKey ? '' : colorKey)
                    }
                    title={colorKey}
                />
            ))}
        </div>
    </div>

            {/* Filtro múltiple de talles */}
            {renderTallesFilter()}

            {/* Filtros de precio mínimo y máximo */}
            <div className={styles.filtroGrupo}>
                <label>Precio</label>
                <div className={styles.subSeparator} />
                <div className={styles.precioColumn}>
                    <input
                        type="number"
                        placeholder="Mínimo"
                        value={localPrecioMin}
                        onChange={(e) => setLocalPrecioMin(e.target.value)}
                        onKeyDown={(e) => handlePrecioKeyDown(e, 'precioMin')}
                    />
                <input
                        type="number"
                        placeholder="Máximo"
                        value={localPrecioMax}
                        onChange={(e) => setLocalPrecioMax(e.target.value)}
                    onKeyDown={(e) => handlePrecioKeyDown(e, 'precioMax')}
                />
            </div>
        </div>

    </aside>
</div>
);
};

export default FiltroSideBar;