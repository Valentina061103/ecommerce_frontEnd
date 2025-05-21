import { useParams } from 'react-router-dom';
import { useCatalogoStore } from '../../store/catalogoStore';
import styles from './Product.module.css'; 

export const Product = () => {
    const { id } = useParams();
    const productos = useCatalogoStore((state) => state.productos);

    if (!id) {
        return <div>ID de producto no válido</div>;
    }
    const producto = productos.find((p) => p.id === parseInt(id));

    if (!producto) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className={styles.ProductDetailContainer}>
        <img src={producto.imagen} alt={producto.nombre} className={styles.ProductImage} />
        <div className={styles.ProductInfo}>
            <h1>{producto.nombre}</h1>
            <p className={styles.ProductPrice}>${producto.precio.toLocaleString()}</p>
            <p>{producto.descripcion}</p>
            <button className={styles.AddToCartButton}>Agregar al Carrito</button>
        </div>
    </div>
    );
};

export default Product;

