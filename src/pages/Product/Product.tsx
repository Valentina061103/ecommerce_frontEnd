
import { useLocation } from 'react-router-dom';
import styles from './Product.module.css'; 


export const Product = () => {
    //va a recibir los datos pasados
    const location = useLocation();
    const producto = location.state;

    if (!producto) {
        return <div>No se encontró el producto</div>
    }

    return (
        <div className={styles.ProductDetailContainer}>
            <img src={producto.imagen} alt={producto.nombre} className={styles.ProductImage} />
            <div className={styles.ProductInfo}>
                <h1>{producto.nombre}</h1>
                <p className={styles.ProductPrice}>${producto.precio.toLocaleString()}</p>
                <p>{producto.marca} - {producto.color}</p>
                <button className={styles.AddToCartButton}>Agregar al Carrito</button>
            </div>
        </div>
    );
};

export default Product;

