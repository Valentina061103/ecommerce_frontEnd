
import styles from './Product.module.css'; 

interface DetalleProducto {
    marca: string;
    nombre: string;
    precio: number;
    img: string;
    sexo: string;
}
const Producto: DetalleProducto[] = [
    { marca: "Nike",nombre: "Lather", precio: 179999, img: "src/assets/zapatilla1.png" , sexo:"hombre"},
];

export const Product = () => {

    return (
        <div className={styles.ProductDetailContainer}>
            {/* <div className={styles.}>

            </div>
            <img src={Producto.imagen} alt={producto.nombre} className={styles.ProductImage} />
            <div className={styles.ProductInfo}>
                <h1>{producto.nombre}</h1>
                <p className={styles.ProductPrice}>${producto.precio.toLocaleString()}</p>
                <p>{producto.descripcion}</p>
                <button className={styles.AddToCartButton}>Agregar al Carrito</button>
            </div> */}
        </div>
    );
};

export default Product;

