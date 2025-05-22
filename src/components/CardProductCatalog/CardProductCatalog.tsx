import React from 'react';
import styles from './CardProductCatalog.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
    id: number;
    nombre: string;
    marca: string;
    color: string;
    precio: number;
    imagen: string;
}

const ProductCard: React.FC<Props> = ({ id,nombre, marca, color, precio, imagen }) => {

    const navigate = useNavigate();
    const toProductDetail = () => {
        navigate(`/product/${nombre}`, {
            //pasamos todos los datos del producto como state
            state: {
                id,
                nombre,
                marca,
                color,
                precio,
                imagen,
            }
        })
    }
    return (
        <div className={styles.ProductCard} onClick={toProductDetail}>
            <div className={styles.ProductImage} >
                <img src={imagen} alt={nombre} />
            </div>
            <div className={styles.ProductInfo}>
                <h3>{nombre}</h3>
                <p>{marca} - {color}</p>
                <p className={styles.ProductPrice}>
                    {typeof precio === 'number' ? 
                    `$${precio.toLocaleString()}`:
                    'Precio no disponible'}</p>
            </div>
        </div>
    );
};

export default ProductCard;
