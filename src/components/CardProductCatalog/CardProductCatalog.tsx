import React from 'react';
import styles from './CardProductCatalog.module.css';

interface Props {
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

const ProductCard: React.FC<Props> = ({ nombre, descripcion, precio, imagen }) => {
    return (
        <div className={styles.ProductCard}>
        <img src={imagen} alt={nombre} className={styles.ProductImage} />
        <div className={styles.ProductInfo}>
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
            <p className={styles.ProductPrice}>${precio.toLocaleString()}</p>
        </div>
        </div>
    );
};

export default ProductCard;
