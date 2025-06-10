
import { useLocation } from 'react-router-dom';
import styles from './Product.module.css'; 


interface Talle {
    numero: number;
}
const Talles: Talle[] = [
    { numero: 5 }, { numero: 5.5 }, { numero: 6 }, { numero: 6.5 }, { numero: 7 }, { numero: 7.5 }, 
    { numero: 8 }, { numero: 8.5 }, { numero: 9 }, { numero: 9.5 }, { numero: 10 }, { numero: 10.5 }, 
    { numero: 11 }, { numero: 11.5 }, { numero: 12 }, { numero: 12.5 }, 
];

export const Product = () => {
    //va a recibir los datos pasados
    const location = useLocation();
    const producto = location.state;

    if (!producto) {
        return <div>No se encontró el producto</div>
    }

    return (
        <div className={styles.container_content}>
            <div className={styles.ProductDetailContainer}>
                <div className={styles.product_imagesSection}>
                    <div className={styles.product_imagesSection_imagen}>1</div>
                    <div className={styles.product_imagesSection_imagen}>2</div>
                    <div className={styles.product_imagesSection_imagen}>3</div>
                    <div className={styles.product_imagesSection_imagen}>4</div>
                </div>
                <div className={styles.product_imagenPricipalSection}>
                    <img src={producto.imagen} alt={producto.nombre} className={styles.product_imagenPricipalSection_imagen} />
                </div>
                <div className={styles.product_infoSection}>
                    <h1>{producto.nombre}</h1>
                    <p>{producto.marca} - {producto.color}</p>
                    <p className={styles.ProductPrice}>${producto.precio.toLocaleString()}</p>

                    <div className={styles.product_infoSection_talles}>
                        <p className={styles.titulo}>Seleccionar un talle</p>
                        <div className={styles.container_talles}>
                            {Talles.map((talle => (
                                <div className={styles.talle}>
                                    <p>{talle.numero}</p>
                                </div>
                            )))}
                        </div>
                    </div>
                    <button className={styles.AddToCartButton}>Agregar al Carrito</button>
                </div>
            </div>
        </div>
    );
};

export default Product;

