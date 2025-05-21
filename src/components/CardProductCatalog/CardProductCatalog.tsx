import React from 'react';
import styles from './CardProductCatalog.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

const ProductCard: React.FC<Props> = ({id, nombre, descripcion, precio, imagen }) => {

    const navigate = useNavigate();
    const toProductDetail = () => {
        navigate(`/product/${id}`)
    }
    return (
        <div className={styles.ProductCard} onClick={toProductDetail}>
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
